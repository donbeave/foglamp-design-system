#!/usr/bin/env bun
import { readFileSync } from 'node:fs';
import { validatePublic } from './verify-public.ts';

const surfaces: [string, 'plain' | 'markdown' | 'mdx' | 'tsx'][] = [
  ['NOTICE', 'plain'],
  ['README.md', 'markdown'],
  ['CREDITS.md', 'markdown'],
  ['apps/docs/content/docs/index.mdx', 'mdx'],
  ['apps/docs/content/docs/credits.mdx', 'mdx'],
  ['apps/docs/src/routes/index.tsx', 'tsx'],
];

let failures = 0;
function check(
  name: string,
  surface: { file: string; kind: 'plain' | 'markdown' | 'mdx' | 'tsx'; text: string },
  valid: boolean,
) {
  const ok = (validatePublic(surface).length === 0) === valid;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failures++;
}

for (const [file, kind] of surfaces) {
  const text = readFileSync(file, 'utf8');
  check(`${file} actual`, { file, kind, text }, true);
  if (kind === 'plain') continue;
  for (const marker of ['Good artists copy, great artists steal', 'https://gustavofior.com']) {
    const removed = text.replaceAll(marker, 'REMOVED');
    const hidden =
      kind === 'tsx'
        ? `${removed}\n// ${marker}\nconst unused = '${marker}';\n`
        : kind === 'mdx'
          ? `${removed}\n\n{/* ${marker} */}\n`
          : `${removed}\n\n<!-- ${marker} -->\n`;
    check(`${file} hidden ${marker}`, { file, kind, text: hidden }, false);
    if (kind !== 'tsx') {
      check(
        `${file} fenced ${marker}`,
        { file, kind, text: `${removed}\n\n\`\`\`text\n${marker}\n\`\`\`\n` },
        false,
      );
    }
  }
}

const homepage = 'apps/docs/src/routes/index.tsx';
const source = readFileSync(homepage, 'utf8');
check(
  'homepage JSX comment',
  {
    file: homepage,
    kind: 'tsx',
    text: source.replace(
      'Good artists copy, great artists steal.',
      '{/* Good artists copy, great artists steal. */}',
    ),
  },
  false,
);

process.exitCode = failures ? 1 : 0;
