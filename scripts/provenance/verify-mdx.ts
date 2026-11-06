#!/usr/bin/env bun
/**
 * Parse every MDX page via @mdx-js/mdx AST; prose, examples, and comments do not count as active JSX.
 * Component pages render their single provenance bar via `<story.WithControl />` (`story-panel.tsx` -> `StoryProvenance`).
 */
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const docs = resolve('apps/docs');
let parser: string;
try {
  parser = require.resolve('@mdx-js/mdx', { paths: [docs] });
} catch {
  const fumadocs = require.resolve('fumadocs-mdx/package.json', { paths: [docs] });
  parser = createRequire(fumadocs).resolve('@mdx-js/mdx');
}
const { createProcessor } = await import(pathToFileURL(parser).href);
const processor = createProcessor();

export interface CatalogItem {
  registryItem: string;
  provenance: 'copied-1-to-1' | 'modified' | 'tailrocks-original';
  provenanceLabel: string;
  upstreamUrl?: string | null;
  inspirationUrl?: string | null;
}

const VALID_LABELS = new Set([
  '1:1 Copied',
  'Modified (Import/Prop Decoupled)',
  'Newly Added by Tailrocks',
]);

const helperCache = new Map<string, boolean>();
function helperCredit(helper: string): boolean {
  if (!helperCache.has(helper)) helperCache.set(helper, inspectHelper(helper));
  return helperCache.get(helper)!;
}

function inspectHelper(helper: string): boolean {
  const provFile = helper.endsWith('.tsx') ? helper : `${helper}.tsx`;
  if (!existsSync(provFile)) return false;
  const source = ts.createSourceFile(
    provFile,
    readFileSync(provFile, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const fn = source.statements.find(
    (node): node is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(node) && node.name?.text === 'StoryProvenance',
  );
  const returned = fn?.body?.statements.find(ts.isReturnStatement)?.expression;
  if (!returned || !fn?.body) return false;
  const assignments = new Map<string, string>();
  for (const statement of fn.body.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const decl of statement.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer) {
          assignments.set(decl.name.text, decl.initializer.getText(source).replace(/\s+/g, ''));
        }
      }
    }
  }
  const defaults: [string, string][] = [
    ['renderedRepositoryUrl', 'repositoryUrl??upstreamRepository'],
    ['renderedFoglampWebsite', "foglampWebsite??'https://foglamp.dev'"],
    ['renderedCreatorWebsite', "creatorWebsite??'https://gustavofior.com'"],
  ];
  if (!defaults.every(([key, value]) => assignments.get(key) === value)) return false;
  const hrefs = new Set<string>();
  let text = '';
  function visit(node: ts.Node) {
    if (ts.isJsxText(node)) text += node.text;
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(source) === 'href' &&
      node.initializer &&
      ts.isJsxExpression(node.initializer) &&
      node.initializer.expression &&
      ts.isIdentifier(node.initializer.expression)
    ) {
      hrefs.add(node.initializer.expression.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(returned);
  const provValid =
    text.includes('Gustavo Fior') &&
    ['renderedRepositoryUrl', 'renderedFoglampWebsite', 'renderedCreatorWebsite'].every((href) =>
      hrefs.has(href),
    );
  if (!provValid) return false;

  const panelPath = resolve(dirname(provFile), 'story-panel.tsx');
  if (!existsSync(panelPath)) return false;
  const panelText = readFileSync(panelPath, 'utf8');
  return (
    panelText.includes('StoryProvenance') &&
    panelText.includes('provenanceLabel') &&
    (panelText.includes('upstreamUrl') || panelText.includes('inspirationUrl'))
  );
}

export function validateMdx({
  file,
  text,
  item,
  helper,
}: {
  file: string;
  text: string;
  item: CatalogItem | null;
  helper: string;
}): string[] {
  const errors: string[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: remark/mdx AST
  let tree: any;
  try {
    tree = processor.parse(text.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, ''));
  } catch (error) {
    return [`${file}: MDX parse error: ${(error as Error).message}`];
  }
  const urls: string[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: remark/mdx AST
  function visible(node: any): string {
    if (
      ['code', 'html', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'definition'].includes(
        node.type,
      )
    ) {
      return '';
    }
    if (node.type === 'link' && node.url) urls.push(node.url);
    if (node.type === 'text' || node.type === 'inlineCode') return node.value;
    return (node.children || []).map(visible).join('');
  }
  const content = `${visible(tree)} ${urls.join(' ')}`;
  const missingCredit = ['Gustavo Fior', 'foglamp.dev', 'foglamp-labs/foglamp'].filter(
    (marker) => !content.includes(marker),
  );
  if (!item) {
    for (const marker of missingCredit) {
      errors.push(`${file}: missing visible credit ${marker}`);
    }
    return errors;
  }

  // Validate catalog provenance metadata for component page
  if (!VALID_LABELS.has(item.provenanceLabel)) {
    errors.push(`${file}: invalid provenanceLabel ${item.provenanceLabel}`);
  }
  const expectedUrl =
    item.upstreamUrl ||
    item.inspirationUrl ||
    (item.provenance === 'tailrocks-original' ? 'https://github.com/foglamp-labs/foglamp' : '');
  if (!expectedUrl || !expectedUrl.startsWith('https://github.com/foglamp-labs/foglamp')) {
    errors.push(`${file}: invalid source or inspiration URL`);
  }

  // Expected story module path for this component MDX file
  const relFromDocs = file.replace(/\\/g, '/').split('/apps/docs/content/docs/')[1] ?? '';
  const storyRel = relFromDocs.replace(/\.mdx$/, '.story');
  const expectedStoryBase = resolve(dirname(helper), '..', 'stories', storyRel);

  const storyBindings = new Set<string>();
  for (const node of tree.children) {
    if (node.type !== 'mdxjsEsm') continue;
    for (const statement of node.data.estree.body) {
      if (statement.type !== 'ImportDeclaration' || typeof statement.source.value !== 'string') {
        continue;
      }
      const source = statement.source.value;
      if (!source.startsWith('.')) continue;
      const resolvedImport = resolve(dirname(file), source);
      if (
        resolvedImport !== expectedStoryBase &&
        resolvedImport !== `${expectedStoryBase}.tsx` &&
        resolvedImport !== `${expectedStoryBase}.ts`
      ) {
        continue;
      }
      for (const specifier of statement.specifiers) {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'story') {
          storyBindings.add(specifier.local.name);
        }
      }
    }
  }

  // Top-level JSX `<story.WithControl />` (or aliased `<preview.WithControl />`) must be rendered outside comments and code fences.
  const activeWorkbenches = tree.children.filter(
    // biome-ignore lint/suspicious/noExplicitAny: remark/mdx AST
    (node: any) =>
      node.type === 'mdxJsxFlowElement' &&
      typeof node.name === 'string' &&
      node.name.endsWith('.WithControl') &&
      storyBindings.has(node.name.slice(0, -'.WithControl'.length)),
  );
  if (activeWorkbenches.length === 0) {
    errors.push(`${file}: missing active imported <story.WithControl /> workbench`);
  }

  // Component MDX pages must NOT contain duplicate <StoryProvenance /> tags
  const duplicateProvenance = tree.children.filter(
    // biome-ignore lint/suspicious/noExplicitAny: remark/mdx AST
    (node: any) => node.type === 'mdxJsxFlowElement' && node.name === 'StoryProvenance',
  );
  if (duplicateProvenance.length > 0) {
    errors.push(`${file}: duplicate <StoryProvenance /> tag in MDX; provenance is rendered by <story.WithControl />`);
  }

  if (!helperCredit(helper)) {
    errors.push(`${file}: story-panel / StoryProvenance helper credit validation failed`);
  }

  return errors;
}

if (import.meta.main) {
  const data = await Bun.stdin.text();
  const input = JSON.parse(data);
  const errors = input.pages.flatMap((page: { file: string; text: string; item: CatalogItem | null }) =>
    validateMdx({ ...page, helper: input.helper }),
  );
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`MDX provenance: ${input.pages.length} page(s), ${errors.length} issue(s)`);
  process.exitCode = errors.length ? 1 : 0;
}
