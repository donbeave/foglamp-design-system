#!/usr/bin/env bun
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateMdx, type CatalogItem } from './verify-mdx.ts';

const file = resolve('apps/docs/content/docs/primitives/button.mdx');
const text = readFileSync(file, 'utf8');
const catalog = JSON.parse(readFileSync('apps/docs/public/r/story-items.json', 'utf8'));
const item = catalog.items.find((entry: CatalogItem) => entry.registryItem === 'ui-button') as CatalogItem;
const helper = resolve('apps/docs/src/components/provenance');
const jsx = text.match(/<story\.WithControl\s*\/>/)![0];

const cases: [string, string, CatalogItem, boolean][] = [
  ['current', text, item, true],
  [
    'alias',
    text
      .replace('import { story }', 'import { story as preview }')
      .replace(jsx, '<preview.WithControl />'),
    item,
    true,
  ],
  ['comment', text.replace(jsx, `{/* ${jsx} */}`), item, false],
  ['fenced', text.replace(jsx, `\`\`\`tsx\n${jsx}\n\`\`\``), item, false],
  ['missing import', text.replace(/import \{ story \}[^\n]*\n/, ''), item, false],
  [
    'wrong import',
    text.replace(
      "../../../src/stories/primitives/button.story'",
      "../../../src/stories/primitives/other.story'",
    ),
    item,
    false,
  ],
  ['wrong label', text, { ...item, provenanceLabel: 'wrong' }, false],
  ['wrong URL', text, { ...item, upstreamUrl: 'https://example.com' }, false],
];

let failures = 0;
for (const [name, source, testItem, valid] of cases) {
  const passed = validateMdx({ file, text: source, item: testItem, helper }).length === 0;
  if (passed !== valid) failures++;
  console.log(`${passed === valid ? 'PASS' : 'FAIL'} ${name}`);
}

const foundationFile = resolve('apps/docs/content/docs/foundations/architecture.mdx');
const foundation = readFileSync(foundationFile, 'utf8');
const credit = foundation.match(/^> Original Foglamp design.*$/m)![0];
const foundationCases: [string, string, boolean][] = [
  ['foundation current', foundation, true],
  ['foundation comment', foundation.replace(credit, `{/* ${credit} */}`), false],
  ['foundation removed', foundation.replace(credit, ''), false],
  ['foundation fenced', foundation.replace(credit, `\`\`\`text\n${credit}\n\`\`\``), false],
  [
    'foundation frontmatter',
    foundation.replace(credit, '').replace('---\n', `---\ncredit: ${credit}\n`),
    false,
  ],
];

for (const [name, source, valid] of foundationCases) {
  const passed = validateMdx({ file: foundationFile, text: source, item: null, helper }).length === 0;
  if (passed !== valid) failures++;
  console.log(`${passed === valid ? 'PASS' : 'FAIL'} ${name}`);
}

process.exitCode = failures ? 1 : 0;
