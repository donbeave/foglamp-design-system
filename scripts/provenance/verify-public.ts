#!/usr/bin/env bun
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const mdxPath = require.resolve('@mdx-js/mdx');
const mdxRequire = createRequire(mdxPath);
const { createProcessor } = await import(pathToFileURL(mdxPath).href);
const { unified } = await import(pathToFileURL(mdxRequire.resolve('unified')).href);
const { default: remarkParse } = await import(pathToFileURL(mdxRequire.resolve('remark-parse')).href);
const markdown = unified().use(remarkParse);
const mdx = createProcessor();

export const required = [
  'Good artists copy, great artists steal',
  'Apache-2.0',
  'Gustavo Fior',
  '@gustavo-fior',
  'https://gustavofior.com',
  'Abdul Haidar',
  'Foglamp Labs',
  'https://foglamp.dev',
  'https://github.com/foglamp-labs/foglamp',
];

function markdownContent(text: string, isMdx: boolean): string {
  const body = text.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '');
  const tree = (isMdx ? mdx : markdown).parse(body);
  const urls: string[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: remark/mdx AST
  function visit(node: any): string {
    if (
      ['code', 'html', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'definition'].includes(
        node.type,
      )
    ) {
      return '';
    }
    if (node.type === 'link' && node.url) urls.push(node.url);
    if (node.type === 'text' || node.type === 'inlineCode') return node.value;
    return (node.children || []).map(visit).join('');
  }
  return `${visit(tree)} ${urls.join(' ')}`;
}

function homepageContent(text: string, file: string): string {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  // biome-ignore lint/suspicious/noExplicitAny: TypeScript internal parseDiagnostics
  if ((source as any).parseDiagnostics?.length) throw new Error('TSX parse error');
  const home = source.statements.find(
    (node): node is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(node) && node.name?.text === 'HomePage',
  );
  const returned = home?.body?.statements.find(ts.isReturnStatement)?.expression;
  if (!returned) throw new Error('HomePage has no rendered return');
  const urls: string[] = [];
  function visit(node: ts.Node): string {
    if (ts.isParenthesizedExpression(node)) return visit(node.expression);
    if (ts.isJsxText(node)) return node.text;
    if (ts.isJsxElement(node)) return visit(node.openingElement) + node.children.map(visit).join('');
    if (ts.isJsxFragment(node)) return node.children.map(visit).join('');
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      for (const attr of node.attributes.properties) {
        if (
          ts.isJsxAttribute(attr) &&
          attr.name.getText(source) === 'href' &&
          attr.initializer &&
          ts.isStringLiteral(attr.initializer)
        ) {
          urls.push(attr.initializer.text);
        }
      }
      return '';
    }
    if (ts.isJsxExpression(node) && node.expression && ts.isStringLiteral(node.expression)) {
      return node.expression.text;
    }
    return '';
  }
  return `${visit(returned)} ${urls.join(' ')}`;
}

export function validatePublic({
  file,
  text,
  kind,
}: {
  file: string;
  text: string;
  kind: 'plain' | 'markdown' | 'mdx' | 'tsx';
}): string[] {
  try {
    const content = (
      kind === 'plain'
        ? text
        : kind === 'tsx'
          ? homepageContent(text, file)
          : markdownContent(text, kind === 'mdx')
    ).replace(/\s+/g, ' ');
    return required
      .filter((marker) => !content.includes(marker))
      .map((marker) => `${file}: missing visible ${marker}`);
  } catch (error) {
    return [`${file}: public attribution parse error: ${(error as Error).message}`];
  }
}

if (import.meta.main) {
  const data = await Bun.stdin.text();
  const surfaces = JSON.parse(data);
  const errors = surfaces.flatMap(validatePublic);
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`Public attribution: ${surfaces.length} surface(s), ${errors.length} issue(s)`);
  process.exitCode = errors.length ? 1 : 0;
}
