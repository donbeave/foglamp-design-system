#!/usr/bin/env python3
"""Verify the source and distributed registry provenance against the reviewed pin."""
import json,pathlib,re,subprocess,sys,os
R=pathlib.Path(__file__).resolve().parents[2]; C='7d7e6609108019a74902858d4b07c24825c6318b'; BASE='https://github.com/foglamp-labs/foglamp/blob/'+C+'/'
subprocess.run([sys.executable,str(R/'scripts/provenance/headers.py'),'--check'],check=True)
errors=[]
def fail(s): errors.append(s)
def markers(text,required,where):
 for marker in required:
  if marker not in text: fail(f'{where}: missing {marker}')
rdir=R/'apps/docs/public/r'; catalog=json.loads((rdir/'story-items.json').read_text()); labels={'copied-1-to-1':'1:1 Copied','modified':'Modified (Import/Prop Decoupled)','tailrocks-original':'Newly Added by Tailrocks'}
fixture_done=False
for f in sorted(rdir.glob('*.json')):
 data=json.loads(f.read_text())
 if 'files' not in data: continue
 if not fixture_done and '--fixture-stripped-payload' in sys.argv:
  data['files'][0]['content']='stripped'; fixture_done=True
 if not fixture_done and '--fixture-false-url' in sys.argv and data.get('upstreamPath'):
  data['upstreamUrl']=BASE+'fabricated.ts'; fixture_done=True
 prov=data.get('provenance'); p=data.get('upstreamPath'); url=data.get('upstreamUrl')
 if prov not in labels or data.get('provenanceLabel')!=labels.get(prov) or data.get('upstreamCommit')!=C: fail(f'{f}: invalid provenance metadata')
 if prov=='tailrocks-original' and (p or url): fail(f'{f}: original falsely claims upstream path')
 if prov!='tailrocks-original' and (not p or url!=BASE+p): fail(f'{f}: invalid upstream path/url')
 for item in data['files']:
  content=item.get('content',''); markers(content,['SPDX-License-Identifier: Apache-2.0','SPDX-FileCopyrightText','Gustavo Fior','Abdul Haidar','Foglamp Labs','https://foglamp.dev'],str(f)+':'+item.get('path',''))
  target=item.get('path','').removeprefix('src/components/framerock/'); source=R/'packages/design-system/src'/target
  if source.is_file() and '@provenance copied-1-to-1' in source.read_text() and content!=source.read_text() and 'Apache-2.0 Section 4(b) Registry Packaging Notice' not in content: fail(f'{f}: missing packaging notice for {target}')
for item in catalog['items']:
 prov=item.get('provenance'); p=item.get('upstreamPath')
 if prov not in labels or item.get('provenanceLabel')!=labels.get(prov) or item.get('upstreamCommit')!=C: fail('story catalog: invalid provenance')
 if prov=='tailrocks-original' and (p or item.get('upstreamUrl')): fail('story catalog: fabricated original path')
 if prov!='tailrocks-original' and (not p or item.get('upstreamUrl')!=BASE+p): fail('story catalog: invalid upstream url')
if '--scoped' not in sys.argv:
 panel=(R/'apps/docs/src/components/story-panel.tsx').read_text()
 markers(panel,['provenanceLabel','upstreamUrl','inspirationUrl','Gustavo Fior','foglamp.dev','foglamp-labs/foglamp'],'story panel')
 catalog_by_name={item['registryItem']:item for item in catalog['items']}
 mdx_pages=[]
 for category in ['primitives','widgets','charts','figures','blocks']:
  for f in (R/'apps/docs/content/docs'/category).rglob('*.mdx'):
   if f.name=='index.mdx': continue
   text=f.read_text(); markers(text,['Gustavo Fior','foglamp.dev','foglamp-labs/foglamp'],str(f))
   if not any(x in text for x in labels.values()): fail(f'{f}: missing provenance label')
   if BASE not in text: fail(f'{f}: missing pinned source or inspiration link')
   story=R/'apps/docs/src/stories'/category/(f.stem+'.story.tsx')
   if story.exists():
    match=re.search(r"registryItem\s*:\s*['\"]([^'\"]+)",story.read_text())
    item=catalog_by_name.get(match.group(1)) if match else None
    if not item: fail(f'{f}: missing story provenance mapping')
    else:
     if '--fixture-mdx-comment' in sys.argv and category=='primitives' and f.stem=='button':
      text=re.sub(r'(<StoryProvenance\b[^>]*/>)', r'{/* \1 */}', text, count=1)
     if '--fixture-mdx-fence' in sys.argv and category=='primitives' and f.stem=='button':
      text=re.sub(r'(<StoryProvenance\b[^>]*/>)', lambda match: '```tsx\n'+match.group(1)+'\n```', text, count=1)
     mdx_pages.append({'file':str(f),'text':text,'item':item})
     expected=item.get('upstreamUrl') or item.get('inspirationUrl')
     if item['provenanceLabel'] not in text or not expected or expected not in text: fail(f'{f}: provenance differs from story source')
     if item['provenance']=='tailrocks-original' and 'not an upstream' not in text.lower(): fail(f'{f}: original must state it is not an upstream source file')
   else: fail(f'{f}: missing story provenance mapping')
 component_files={page['file'] for page in mdx_pages}
 for f in sorted((R/'apps/docs/content/docs').rglob('*.mdx')):
  if str(f) in component_files: continue
  text=f.read_text()
  if '--fixture-foundation-comment' in sys.argv and f.name=='architecture.mdx' and f.parent.name=='foundations':
   text=re.sub(r'(?m)^> Original Foglamp design.*$', lambda match: '{/* '+match.group(0)+' */}', text)
  mdx_pages.append({'file':str(f),'text':text,'item':None})
 result=subprocess.run(['node',str(R/'scripts/provenance/verify-mdx.mjs')],input=json.dumps({'pages':mdx_pages,'helper':str(R/'apps/docs/src/components/provenance')}),text=True,cwd=R)
 if result.returncode: fail('active MDX provenance validation failed')
 public=[]
 for f,kind in [('NOTICE','plain'),('CREDITS.md','markdown'),('README.md','markdown'),('apps/docs/src/routes/index.tsx','tsx'),('apps/docs/content/docs/index.mdx','mdx'),('apps/docs/content/docs/credits.mdx','mdx')]:
  text=(R/f).read_text()
  if f=='CREDITS.md' and '--fixture-public-comment' in sys.argv:
   text='<!--\n'+text+'\n-->'
  if f=='CREDITS.md' and '--fixture-public-fence' in sys.argv:
   text='```text\n'+text+'\n```'
  public.append({'file':f,'kind':kind,'text':text})
 result=subprocess.run(['node',str(R/'scripts/provenance/verify-public.mjs')],input=json.dumps(public),text=True,cwd=R)
 if result.returncode: fail('visible public attribution validation failed')
 for directory, dirs, files in os.walk(R):
  dirs[:] = [d for d in dirs if d not in {'.reference','node_modules','.git'}]
  for name in files:
   f=pathlib.Path(directory)/name
   if name in ['original-authors-block.tsx','avatar.jpg','abdul-haidar.jpg']: fail(f'{f}: prohibited identity asset')
   if f.suffix in ('.ts','.tsx','.js','.jsx') and 'public/r' not in str(f):
    text=f.read_text(errors='replace')
    if re.search(r'["\']@type["\']\s*:\s*["\']Organization["\']',text) and re.search(r'(?:["\']name["\']|\bname)\s*:\s*["\']Foglamp["\']',text): fail(f'{f}: impersonating Foglamp organization')
 reg=json.loads((R/'packages/registry/registry.json').read_text())
 if reg.get('homepage')!='https://github.com/tailrocks/framerock': fail('registry publisher homepage invalid')
for e in errors: print('ERROR',e,file=sys.stderr)
print(f'Provenance gates: {len(errors)} issue(s)')
sys.exit(bool(errors))
