#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateMdx } from './verify-mdx.mjs';
const file = resolve('apps/docs/content/docs/primitives/button.mdx');
const text = readFileSync(file, 'utf8');
const catalog = JSON.parse(readFileSync('apps/docs/public/r/story-items.json', 'utf8'));
const item = catalog.items.find(item => item.registryItem === 'ui-button');
const helper = resolve('apps/docs/src/components/provenance');
const jsx = text.match(/<StoryProvenance\b[^>]*\/>/)[0];
const cases = [
  ['current', text, true],
  ['alias', text.replace('import { StoryProvenance }', 'import { StoryProvenance as Credit }').replace(jsx, jsx.replace('StoryProvenance', 'Credit')), true],
  ['comment', text.replace(jsx, `{/* ${jsx} */}`), false],
  ['fenced', text.replace(jsx, `\`\`\`tsx\n${jsx}\n\`\`\``), false],
  ['missing import', text.replace(/import \{ StoryProvenance \}[^\n]*\n/, ''), false],
  ['wrong import', text.replace("../../../src/components/provenance'", "../../../src/components/other'"), false],
  ['wrong label', text.replace('provenanceLabel="Modified (Import/Prop Decoupled)"', 'provenanceLabel="wrong"'), false],
  ['wrong URL', text.replace(/sourceUrl="[^"]+"/, 'sourceUrl="https://example.com"'), false],
];
let failures = 0;
for (const [name, source, valid] of cases) {
  const passed = validateMdx({ file, text: source, item, helper }).length === 0;
  if (passed !== valid) failures++;
  console.log(`${passed === valid ? 'PASS' : 'FAIL'} ${name}`);
}
const foundationFile = resolve('apps/docs/content/docs/foundations/architecture.mdx');
const foundation = readFileSync(foundationFile, 'utf8');
const credit = foundation.match(/^> Original Foglamp design.*$/m)[0];
for (const [name, source, valid] of [
  ['foundation current', foundation, true],
  ['foundation comment', foundation.replace(credit, `{/* ${credit} */}`), false],
  ['foundation removed', foundation.replace(credit, ''), false],
  ['foundation fenced', foundation.replace(credit, `\`\`\`text\n${credit}\n\`\`\``), false],
  ['foundation frontmatter', foundation.replace(credit, '').replace('---\n', `---\ncredit: ${credit}\n`), false],
]) {
  const passed = validateMdx({ file: foundationFile, text: source, item: null, helper }).length === 0;
  if (passed !== valid) failures++;
  console.log(`${passed === valid ? 'PASS' : 'FAIL'} ${name}`);
}
process.exitCode = failures ? 1 : 0;
