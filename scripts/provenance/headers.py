#!/usr/bin/env python3
"""Apply reviewed, hash-bound provenance headers without altering source bodies."""
import hashlib,json,pathlib,re,subprocess,sys
ROOT=pathlib.Path(__file__).resolve().parents[2]
COMMIT='7d7e6609108019a74902858d4b07c24825c6318b'
manifest=json.loads((ROOT/'scripts/provenance/manifest.json').read_text())
def sha(b): return hashlib.sha256(b).hexdigest()
def body(b):
 for _ in range(2):
  x=re.sub(rb'\A/\*\*?(?:(?!\*/).)*(?:@provenance|Original design|Original UI|Original project|SPDX-License-Identifier|Foglamp Labs)(?:(?!\*/).)*\*/(?:\r?\n){1,2}',b'',b,count=1,flags=re.S|re.I)
  x=re.sub(rb'\A[\'"]use client[\'"];?(?:\r?\n){1,2}',b'',x,count=1)
  if x==b: break
  b=x
 return b
def header(e):
 c=e['proposed_class']; p=e['upstream_path']; secondary=e['secondary_upstream_paths']
 lines=['/**',' * @license Apache-2.0',' * SPDX-License-Identifier: Apache-2.0']
 if c!='tailrocks-original': lines+=[' * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)']
 if c!='copied-1-to-1': lines+=[' * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)']
 lines+=[' *',f' * @provenance {c}']
 if p:
  lines+=[' * @upstream-repo https://github.com/foglamp-labs/foglamp',f' * @upstream-commit {COMMIT}',f' * @upstream-path {p}',f' * @upstream-url https://github.com/foglamp-labs/foglamp/blob/{COMMIT}/{p}']
  for s in secondary: lines += [f' * @secondary-upstream-url https://github.com/foglamp-labs/foglamp/blob/{COMMIT}/{s}']
 if c=='modified': lines+=[' * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.',' *',' * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the',' * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by',' * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).']
 elif c=='copied-1-to-1': lines+=[' *',' * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),',' * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder',' * Abdul Haidar at Foglamp Labs (https://foglamp.dev).']
 else: lines+=[' * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)',' *',' * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual',' * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and',' * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.']
 return ('\n'.join(lines+[' */',''])+'\n').encode()
actual={str(p.relative_to(ROOT)) for p in (ROOT/'packages/design-system/src').rglob('*') if p.is_file() and p.suffix in ('.ts','.tsx','.css')}
assert actual=={e['path'] for e in manifest['entries']}, 'Source inventory changed; review and refresh provenance manifest'
assert subprocess.check_output(['git','-C',str(ROOT/'.reference/foglamp'),'rev-parse','HEAD']).decode().strip()==COMMIT
fixture_done=False
for e in manifest['entries']:
 f=ROOT/e['path']; old=f.read_bytes();
 if not fixture_done and '--fixture-copied-byte' in sys.argv and e['proposed_class']=='copied-1-to-1':
  old+=b' '; fixture_done=True
 if not fixture_done and '--fixture-missing-4b' in sys.argv and e['proposed_class']=='modified':
  old=old.replace(b'Apache-2.0 Section 4(b) Notice',b'Apache-2.0 Section 4(b) Removed'); fixture_done=True
 if not fixture_done and '--fixture-false-path' in sys.argv and e['proposed_class']=='modified':
  old=old.replace(e['upstream_path'].encode(),b'nonexistent/fabricated.ts'); fixture_done=True
 assert sha(body(old))==e['body_sha256'], e['path']
 if e['upstream_path']:
  upstream=subprocess.check_output(['git','-C',str(ROOT/'.reference/foglamp'),'show',f"{COMMIT}:{e['upstream_path']}"])
  assert (body(old)==body(upstream)) == (e['proposed_class']=='copied-1-to-1'),e['path']
 # Remove old leading attribution only; keep client directive and all other bytes.
 clean=re.sub(rb'\A/\*\*?(?:(?!\*/).)*(?:@provenance|Original design|Original UI|Original project|SPDX-License-Identifier|Foglamp Labs)(?:(?!\*/).)*\*/(?:\r?\n){1,2}',b'',old,count=1,flags=re.S|re.I)
 new=header(e)+clean
 assert sha(body(new))==e['body_sha256'],e['path']
 if '--check' in sys.argv: assert new==old,e['path']
 elif new!=old: f.write_bytes(new)
print(f"{'Verified' if '--check' in sys.argv else 'Applied'} {len(manifest['entries'])} headers; body hashes unchanged")
