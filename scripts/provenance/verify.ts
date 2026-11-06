#!/usr/bin/env bun
/** Verify the source and distributed registry provenance against the reviewed pin. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { validateMdx, type CatalogItem } from './verify-mdx.ts';
import { validatePublic } from './verify-public.ts';

const R = path.resolve(import.meta.dir, '../..');
const C = '7d7e6609108019a74902858d4b07c24825c6318b';
const BASE = `https://github.com/foglamp-labs/foglamp/blob/${C}/`;

const headerCheck = spawnSync('bun', [path.join(R, 'scripts/provenance/headers.ts'), '--check'], {
  cwd: R,
  stdio: 'inherit',
});
if (headerCheck.status !== 0) {
  process.exit(headerCheck.status ?? 1);
}

const errors: string[] = [];
function fail(s: string) {
  errors.push(s);
}
function markers(text: string, required: string[], where: string) {
  for (const marker of required) {
    if (!text.includes(marker)) fail(`${where}: missing ${marker}`);
  }
}

const rdir = path.join(R, 'apps/docs/public/r');
const catalog = JSON.parse(readFileSync(path.join(rdir, 'story-items.json'), 'utf8'));
const labels: Record<string, string> = {
  'copied-1-to-1': '1:1 Copied',
  modified: 'Modified (Import/Prop Decoupled)',
  'tailrocks-original': 'Newly Added by Tailrocks',
};

const args = new Set(process.argv.slice(2));
let fixtureDone = false;

const rFiles = readdirSync(rdir)
  .filter((name) => name.endsWith('.json'))
  .sort()
  .map((name) => path.join(rdir, name));

for (const f of rFiles) {
  const data = JSON.parse(readFileSync(f, 'utf8'));
  if (!('files' in data)) continue;
  if (!fixtureDone && args.has('--fixture-stripped-payload')) {
    data.files[0].content = 'stripped';
    fixtureDone = true;
  }
  if (!fixtureDone && args.has('--fixture-false-url') && data.upstreamPath) {
    data.upstreamUrl = `${BASE}fabricated.ts`;
    fixtureDone = true;
  }
  const prov = data.provenance as string;
  const p = data.upstreamPath as string | null;
  const url = data.upstreamUrl as string | null;
  if (!(prov in labels) || data.provenanceLabel !== labels[prov] || data.upstreamCommit !== C) {
    fail(`${f}: invalid provenance metadata`);
  }
  if (prov === 'tailrocks-original' && (p || url)) {
    fail(`${f}: original falsely claims upstream path`);
  }
  if (prov !== 'tailrocks-original' && (!p || url !== `${BASE}${p}`)) {
    fail(`${f}: invalid upstream path/url`);
  }
  for (const item of data.files) {
    const content: string = item.content ?? '';
    markers(
      content,
      [
        'SPDX-License-Identifier: Apache-2.0',
        'SPDX-FileCopyrightText',
        'Gustavo Fior',
        'Abdul Haidar',
        'Foglamp Labs',
        'https://foglamp.dev',
      ],
      `${f}:${item.path ?? ''}`,
    );
    const target = String(item.path ?? '').replace(/^src\/components\/framerock\//, '');
    const source = path.join(R, 'packages/design-system/src', target);
    if (existsSync(source)) {
      const sourceText = readFileSync(source, 'utf8');
      if (
        sourceText.includes('@provenance copied-1-to-1') &&
        content !== sourceText &&
        !content.includes('Apache-2.0 Section 4(b) Registry Packaging Notice')
      ) {
        fail(`${f}: missing packaging notice for ${target}`);
      }
    }
  }
}

for (const item of catalog.items) {
  const prov = item.provenance as string;
  const p = item.upstreamPath as string | null;
  if (!(prov in labels) || item.provenanceLabel !== labels[prov] || item.upstreamCommit !== C) {
    fail('story catalog: invalid provenance');
  }
  if (prov === 'tailrocks-original' && (p || item.upstreamUrl)) {
    fail('story catalog: fabricated original path');
  }
  if (prov !== 'tailrocks-original' && (!p || item.upstreamUrl !== `${BASE}${p}`)) {
    fail('story catalog: invalid upstream url');
  }
}

function walkFiles(dir: string, suffix: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, suffix, acc);
    else if (entry.name.endsWith(suffix)) acc.push(full);
  }
  return acc.sort();
}

if (!args.has('--scoped')) {
  const panel = readFileSync(path.join(R, 'apps/docs/src/components/story-panel.tsx'), 'utf8');
  const provComponent = readFileSync(
    path.join(R, 'apps/docs/src/components/provenance.tsx'),
    'utf8',
  );
  markers(
    `${panel}\n${provComponent}`,
    [
      'provenanceLabel',
      'upstreamUrl',
      'inspirationUrl',
      'Gustavo Fior',
      'foglamp.dev',
      'foglamp-labs/foglamp',
    ],
    'story panel',
  );

  const catalogByName = new Map<string, CatalogItem>();
  for (const item of catalog.items as CatalogItem[]) {
    catalogByName.set(item.registryItem, item);
  }

  const mdxPages: { file: string; text: string; item: CatalogItem | null }[] = [];
  for (const category of ['primitives', 'widgets', 'charts', 'figures', 'blocks']) {
    for (const f of walkFiles(path.join(R, 'apps/docs/content/docs', category), '.mdx')) {
      if (path.basename(f) === 'index.mdx') continue;
      let text = readFileSync(f, 'utf8');
      const stem = path.basename(f, '.mdx');
      const story = path.join(R, 'apps/docs/src/stories', category, `${stem}.story.tsx`);
      if (existsSync(story)) {
        const match = readFileSync(story, 'utf8').match(/registryItem\s*:\s*['"]([^'"]+)/);
        const item = match ? catalogByName.get(match[1]) : undefined;
        if (!item) {
          fail(`${f}: missing story provenance mapping`);
        } else {
          if (args.has('--fixture-mdx-comment') && category === 'primitives' && stem === 'button') {
            text = text.replace(/(<story\.WithControl\b[^>]*\/>)/, '{/* $1 */}');
          }
          if (args.has('--fixture-mdx-fence') && category === 'primitives' && stem === 'button') {
            text = text.replace(/(<story\.WithControl\b[^>]*\/>)/, '```tsx\n$1\n```');
          }
          mdxPages.push({ file: f, text, item });
        }
      } else {
        fail(`${f}: missing story provenance mapping`);
      }
    }
  }

  const componentFiles = new Set(mdxPages.map((p) => p.file));
  for (const f of walkFiles(path.join(R, 'apps/docs/content/docs'), '.mdx')) {
    if (componentFiles.has(f)) continue;
    let text = readFileSync(f, 'utf8');
    if (
      args.has('--fixture-foundation-comment') &&
      path.basename(f) === 'architecture.mdx' &&
      path.basename(path.dirname(f)) === 'foundations'
    ) {
      text = text.replace(/^> Original Foglamp design.*$/m, (m) => `{/* ${m} */}`);
    }
    mdxPages.push({ file: f, text, item: null });
  }

  const helper = path.join(R, 'apps/docs/src/components/provenance');
  const mdxErrors = mdxPages.flatMap((page) => validateMdx({ ...page, helper }));
  for (const err of mdxErrors) console.error(`ERROR ${err}`);
  console.log(`MDX provenance: ${mdxPages.length} page(s), ${mdxErrors.length} issue(s)`);
  if (mdxErrors.length > 0) fail('active MDX provenance validation failed');

  const publicSurfaces: {
    file: string;
    kind: 'plain' | 'markdown' | 'mdx' | 'tsx';
    text: string;
  }[] = [];
  for (const [f, kind] of [
    ['NOTICE', 'plain'],
    ['CREDITS.md', 'markdown'],
    ['README.md', 'markdown'],
    ['apps/docs/src/routes/index.tsx', 'tsx'],
    ['apps/docs/content/docs/index.mdx', 'mdx'],
    ['apps/docs/content/docs/credits.mdx', 'mdx'],
  ] as const) {
    let text = readFileSync(path.join(R, f), 'utf8');
    if (f === 'CREDITS.md' && args.has('--fixture-public-comment')) {
      text = `<!--\n${text}\n-->`;
    }
    if (f === 'CREDITS.md' && args.has('--fixture-public-fence')) {
      text = `\`\`\`text\n${text}\n\`\`\``;
    }
    publicSurfaces.push({ file: f, kind, text });
  }
  const pubErrors = publicSurfaces.flatMap(validatePublic);
  for (const err of pubErrors) console.error(`ERROR ${err}`);
  console.log(
    `Public attribution: ${publicSurfaces.length} surface(s), ${pubErrors.length} issue(s)`,
  );
  if (pubErrors.length > 0) fail('visible public attribution validation failed');

  function scanTree(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (['.reference', 'node_modules', '.git'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanTree(full);
      } else if (entry.isFile()) {
        if (['original-authors-block.tsx', 'avatar.jpg', 'abdul-haidar.jpg'].includes(entry.name)) {
          fail(`${full}: prohibited identity asset`);
        }
        if (/\.(ts|tsx|js|jsx)$/.test(entry.name) && !full.includes('public/r')) {
          const text = readFileSync(full, 'utf8');
          if (
            /['"]@type['"]\s*:\s*['"]Organization['"]/.test(text) &&
            /(?:['"]name['"]|\bname)\s*:\s*['"]Foglamp['"]/.test(text)
          ) {
            fail(`${full}: impersonating Foglamp organization`);
          }
        }
      }
    }
  }
  scanTree(R);

  const reg = JSON.parse(readFileSync(path.join(R, 'packages/registry/registry.json'), 'utf8'));
  if (reg.homepage !== 'https://github.com/tailrocks/framerock') {
    fail('registry publisher homepage invalid');
  }
}

for (const e of errors) console.error('ERROR', e);
console.log(`Provenance gates: ${errors.length} issue(s)`);
process.exit(errors.length ? 1 : 0);
