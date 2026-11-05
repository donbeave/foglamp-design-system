#!/usr/bin/env node
// Parse every component page in one process; prose, examples and comments do not count.
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const docs = resolve('apps/docs');
let parser;
try {
  parser = require.resolve('@mdx-js/mdx', { paths: [docs] });
} catch {
  // fumadocs-mdx already installs the same parser in existing checkouts.
  const fumadocs = require.resolve('fumadocs-mdx/package.json', { paths: [docs] });
  parser = createRequire(fumadocs).resolve('@mdx-js/mdx');
}
const { createProcessor } = await import(pathToFileURL(parser).href);
const processor = createProcessor();

// Verify the helper's returned anchors use the literal props validated above.
const helperCache = new Map();
function helperCredit(helper) {
  if (!helperCache.has(helper)) helperCache.set(helper, inspectHelper(helper));
  return helperCache.get(helper);
}
function inspectHelper(helper) {
  const source = ts.createSourceFile(helper + '.tsx', readFileSync(helper + '.tsx', 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fn = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'StoryProvenance');
  const returned = fn?.body?.statements.find(ts.isReturnStatement)?.expression;
  if (!returned) return false;
  const assignments = new Map();
  for (const statement of fn.body.statements) if (ts.isVariableStatement(statement)) {
    for (const decl of statement.declarationList.declarations) if (ts.isIdentifier(decl.name) && decl.initializer) assignments.set(decl.name.text, decl.initializer.getText(source).replace(/\s+/g, ''));
  }
  const defaults = [
    ['renderedRepositoryUrl', 'repositoryUrl??upstreamRepository'],
    ['renderedFoglampWebsite', "foglampWebsite??'https://foglamp.dev'"],
    ['renderedCreatorWebsite', "creatorWebsite??'https://gustavofior.com'"],
  ];
  if (!defaults.every(([key, value]) => assignments.get(key) === value)) return false;
  const hrefs = new Set(); let text = '';
  function visit(node) {
    if (ts.isJsxText(node)) text += node.text;
    if (ts.isJsxAttribute(node) && node.name.getText(source) === 'href' && node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression && ts.isIdentifier(node.initializer.expression)) hrefs.add(node.initializer.expression.text);
    ts.forEachChild(node, visit);
  }
  visit(returned);
  return text.includes('Gustavo Fior') && ['renderedRepositoryUrl', 'renderedFoglampWebsite', 'renderedCreatorWebsite'].every(href => hrefs.has(href));
}

export function validateMdx({ file, text, item, helper }) {
  const errors = [];
  let tree;
  try { tree = processor.parse(text.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '')); }
  catch (error) { return [`${file}: MDX parse error: ${error.message}`]; }
  const urls = [];
  function visible(node) {
    if (['code', 'html', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'definition'].includes(node.type)) return '';
    if (node.type === 'link' && node.url) urls.push(node.url);
    if (node.type === 'text' || node.type === 'inlineCode') return node.value;
    return (node.children || []).map(visible).join('');
  }
  const content = `${visible(tree)} ${urls.join(' ')}`;
  const missingCredit = ['Gustavo Fior', 'foglamp.dev', 'foglamp-labs/foglamp'].filter(marker => !content.includes(marker));
  if (!item) {
    for (const marker of missingCredit) errors.push(`${file}: missing visible credit ${marker}`);
    return errors;
  }
  const bindings = new Set();
  for (const node of tree.children) {
    if (node.type !== 'mdxjsEsm') continue;
    for (const statement of node.data.estree.body) {
      if (statement.type !== 'ImportDeclaration' || typeof statement.source.value !== 'string') continue;
      const source = statement.source.value;
      if (!source.startsWith('.') || ![helper, `${helper}.tsx`].includes(resolve(dirname(file), source))) continue;
      for (const specifier of statement.specifiers) {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'StoryProvenance') bindings.add(specifier.local.name);
      }
    }
  }
  // Top-level JSX is rendered by MDX; JSX in expressions, exports and examples is not proof of rendering.
  const candidates = tree.children.filter(node => node.type === 'mdxJsxFlowElement' && bindings.has(node.name));
  const expected = {
    registryItem: item.registryItem,
    provenanceLabel: item.provenanceLabel,
    sourceUrl: item.upstreamUrl || item.inspirationUrl,
    repositoryUrl: 'https://github.com/foglamp-labs/foglamp',
    foglampWebsite: 'https://foglamp.dev',
    creatorWebsite: 'https://gustavofior.com',
  };
  if (item.provenance === 'tailrocks-original') expected.notUpstream = 'This is not an upstream Foglamp source file.';
  const valid = candidates.some(node => {
    const attrs = node.attributes;
    if (attrs.some(attr => attr.type !== 'mdxJsxAttribute' || typeof attr.value !== 'string')) return false;
    const values = Object.fromEntries(attrs.map(attr => [attr.name, attr.value]));
    return attrs.length === Object.keys(expected).length && Object.entries(expected).every(([key, value]) => value && values[key] === value);
  });
  if (!valid) errors.push(`${file}: missing active imported StoryProvenance with matching literal props`);
  if (!valid || !helperCredit(helper)) for (const marker of missingCredit) errors.push(`${file}: missing visible credit ${marker}`);
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  const input = JSON.parse(data);
  const errors = input.pages.flatMap(page => validateMdx({ ...page, helper: input.helper }));
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`MDX provenance: ${input.pages.length} page(s), ${errors.length} issue(s)`);
  process.exitCode = errors.length ? 1 : 0;
}
