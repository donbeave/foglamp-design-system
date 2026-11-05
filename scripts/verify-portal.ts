import { spawnSync } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const docs = path.join(root, "apps/docs");
const provenance = spawnSync("python3", ["scripts/provenance/verify.py"], { stdio: "inherit" });
const errors: string[] = [];
if (provenance.status !== 0) errors.push("Wave 6 provenance gates failed");
const report = (message: string) => errors.push(message);
const read = (file: string) => readFile(file, "utf8");
const exists = async (file: string) => stat(file).then(() => true, () => false);
const historicalChartAliasFixture = process.argv.includes("--fixture-historical-chart-alias");
const browserPromptsFixture = process.argv.includes("--fixture-browser-prompts-barrel");

async function filesUnder(dir: string, suffix?: string): Promise<string[]> {
  if (!(await exists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(file, suffix);
    return !suffix || entry.name.endsWith(suffix) ? [file] : [];
  }));
  return nested.flat();
}

function isServerOnlyPromptsModule(specifier: string, file: string): boolean {
  if (specifier === "@foglamp/prompts") return true;
  const moduleSuffix = /^(?:index|normalize)(?:\.[cm]?[jt]sx?)?$/;
  const alias = /^@(?:tailrocks\/framerock|foglamp\/design-system)\/lib\/prompts(?:\/(.*))?$/.exec(specifier);
  if (alias) return !alias[1] || moduleSuffix.test(alias[1]);
  if (!specifier.startsWith(".")) return false;
  const resolved = path.resolve(path.dirname(path.resolve(root, file)), specifier);
  const promptsRoot = path.join(root, "packages/design-system/src/lib/prompts");
  if (resolved === promptsRoot) return true;
  return path.dirname(resolved) === promptsRoot && moduleSuffix.test(path.basename(resolved));
}

function checkBrowserImports(source: string, file: string): void {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const hasRuntimeImport = (clause: ts.ImportClause | undefined): boolean => {
    if (!clause) return true;
    if (clause.isTypeOnly) return false;
    if (clause.name || !clause.namedBindings) return true;
    if (ts.isNamespaceImport(clause.namedBindings)) return true;
    return clause.namedBindings.elements.some((element) => !element.isTypeOnly);
  };
  const hasRuntimeExport = (node: ts.ExportDeclaration): boolean => {
    if (node.isTypeOnly) return false;
    if (!node.exportClause || !ts.isNamedExports(node.exportClause)) return true;
    return node.exportClause.elements.some((element) => !element.isTypeOnly);
  };
  const reportImport = (specifier: string): void => {
    if (isServerOnlyPromptsModule(specifier, file)) {
      report(`${path.relative(root, file)}: browser runtime import '${specifier}' reaches the server-only prompts barrel/normalizer; import browser-safe leaves directly (infer, diff, or slots)`);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && hasRuntimeImport(node.importClause) && ts.isStringLiteral(node.moduleSpecifier)) {
      reportImport(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && hasRuntimeExport(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      reportImport(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1 && ts.isStringLiteralLike(node.arguments[0]!)) {
      reportImport(node.arguments[0]!.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
}

const browserSourceDirs = [
  path.join(docs, "src/stories"),
  ...["ui", "widgets", "charts", "blocks", "hud"].map((name) => path.join(root, "packages/design-system/src", name)),
];
for (const dir of browserSourceDirs) {
  for (const file of await filesUnder(dir)) {
    if (!/\.[cm]?[jt]sx?$/.test(file)) continue;
    checkBrowserImports(await read(file), file);
  }
}
if (browserPromptsFixture) {
  checkBrowserImports(`
    import { SLOT_LINE } from "@tailrocks/framerock/lib/prompts";
    import { promptHash } from "@foglamp/design-system/lib/prompts/index.ts";
    import type { PromptVersion } from "@tailrocks/framerock/lib/prompts";
    import { slotValues } from "@tailrocks/framerock/lib/prompts/slots";
    export { normalizePrompt } from "@tailrocks/framerock/lib/prompts/normalize";
    import("../lib/prompts/index.ts");
    import("../lib/prompts/normalize.ts");
  `, path.join(root, "packages/design-system/src/widgets/__fixture-browser-prompts__.tsx"));
}

function objectString(node: ts.Expression | undefined, key: string): string | undefined {
  if (!node || !ts.isObjectLiteralExpression(node)) return undefined;
  const property = node.properties.find((item): item is ts.PropertyAssignment =>
    ts.isPropertyAssignment(item) && (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) && item.name.text === key,
  );
  return property && ts.isStringLiteralLike(property.initializer) ? property.initializer.text : undefined;
}

function storyRegistration(source: string, file: string): { id?: string; registryItem?: string } | undefined {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let registration: { id?: string; registryItem?: string } | undefined;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ["defineStory", "defineStoryFactory"].includes(node.expression.text)) {
      const options = node.arguments[0];
      registration = { id: objectString(options, "id"), registryItem: objectString(options, "registryItem") };
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return registration;
}

const storyFiles = await filesUnder(path.join(docs, "src/stories"), ".story.tsx");
const seenIds = new Map<string, string>();
const storyRecords: Array<{ file: string; id: string; registryItem?: string; source: string }> = [];
const storyCategories = new Map<string, number>();
for (const file of storyFiles) {
  const relative = path.relative(path.join(docs, "src/stories"), file).split(path.sep).join("/");
  const expectedId = relative.replace(/\.story\.tsx$/, "");
  let source = await read(file);
  // Reproduce a historical chart-prefix error entirely in memory for a negative contract check.
  if (historicalChartAliasFixture && relative === "charts/area-chart.story.tsx") {
    source = source.replace("registryItem: 'chart-evilcharts-charts-area-chart'", "registryItem: 'chart-charts-evilcharts-charts-area-chart'");
  }
  const registration = storyRegistration(source, file);
  if (!registration?.id) {
    report(`${relative}: no literal id in defineStory(...) registration`);
    continue;
  }
  for (const marker of ["Gustavo Fior", "@gustavo-fior", "Foglamp Labs"]) {
    if (!source.toLowerCase().includes(marker.toLowerCase())) report(`${relative}: missing story attribution marker '${marker}'`);
  }
  if (registration.id !== expectedId) report(`${relative}: id '${registration.id}' should match '${expectedId}'`);
  const first = seenIds.get(registration.id);
  if (first) report(`${relative}: duplicate story id '${registration.id}' also used by ${first}`);
  else seenIds.set(registration.id, relative);
  storyCategories.set(expectedId.split("/")[0] ?? "", (storyCategories.get(expectedId.split("/")[0] ?? "") ?? 0) + 1);
  storyRecords.push({ file, id: registration.id, registryItem: registration.registryItem, source });
}

const registryFile = path.join(root, "packages/registry/registry.json");
const registry = JSON.parse(await read(registryFile)) as { items?: unknown; author?: unknown; homepage?: unknown; name?: unknown; contributors?: unknown };
const registryItems = Array.isArray(registry.items) ? registry.items as Array<{ name?: unknown; files?: unknown }> : [];
const itemNames = new Set(registryItems.flatMap((item) => typeof item.name === "string" ? [item.name] : []));
const catalogFile = path.join(docs, "public/r/story-items.json");
if (!(await exists(catalogFile))) report("apps/docs/public/r/story-items.json: generated story catalog is missing (run bun run build:registry)");
else {
  const catalog = JSON.parse(await read(catalogFile)) as { type?: unknown; items?: unknown };
  if (catalog.type !== "foglamp:story-catalog") report("apps/docs/public/r/story-items.json: expected type foglamp:story-catalog");
  const catalogItems = Array.isArray(catalog.items) ? catalog.items as Array<{ id?: unknown; source?: unknown; registryItem?: unknown }> : [];
  const catalogNames = new Set(catalogItems.flatMap((item) => typeof item.registryItem === "string" ? [item.registryItem] : []));
  for (const story of storyRecords) {
    if (!story.registryItem) { report(`${path.relative(root, story.file)}: missing literal registryItem`); continue; }
    if (!itemNames.has(story.registryItem)) report(`${path.relative(root, story.file)}: registryItem '${story.registryItem}' is absent from registry.json`);
    if (!catalogNames.has(story.registryItem)) report(`${path.relative(root, story.file)}: registryItem '${story.registryItem}' is absent from story-items.json`);
    const generatedItem = path.join(docs, "public/r", `${story.registryItem}.json`);
    if (!(await exists(generatedItem))) report(`${path.relative(root, story.file)}: generated install item ${path.relative(root, generatedItem)} is missing`);
  }
  for (const name of catalogNames) {
    if (!itemNames.has(name)) report(`story-items.json: alias '${name}' has no matching registry item`);
    if (!(await exists(path.join(docs, "public/r", `${name}.json`)))) report(`story-items.json: alias '${name}' has no generated /r/${name}.json install item`);
  }
}

const categoryFolders = ["primitives", "widgets", "charts", "figures", "blocks"];
for (const story of storyRecords) {
  const storyRelative = path.relative(path.join(docs, "src/stories"), story.file).split(path.sep).join("/");
  const [category, ...rest] = storyRelative.split("/");
  if (!categoryFolders.includes(category ?? "")) continue;
  const mdx = path.join(docs, "content/docs", category!, `${rest.join("/").replace(/\.story\.tsx$/, ".mdx")}`);
  if (!(await exists(mdx))) { report(`${path.relative(root, mdx)}: missing MDX page for ${storyRelative}`); continue; }
  const content = await read(mdx);
  const relativeImport = path.relative(path.dirname(mdx), story.file).split(path.sep).join("/").replace(/\.tsx$/, "");
  const normalizedImport = relativeImport.startsWith(".") ? relativeImport : `./${relativeImport}`;
  const imports = [...content.matchAll(/^import\s+[^\n]+;?$/gm)].flatMap((match) => {
    const source = ts.createSourceFile(mdx, match[0], ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    return source.statements.filter(ts.isImportDeclaration);
  });
  const matchingImport = imports.find((statement) => ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === normalizedImport);
  if (!matchingImport || !matchingImport.importClause?.namedBindings || !ts.isNamedImports(matchingImport.importClause.namedBindings) || !matchingImport.importClause.namedBindings.elements.some((element) => element.name.text === "story")) {
    report(`${path.relative(root, mdx)}: missing named { story } import from '${normalizedImport}'`);
  }
  const resolvedImport = path.resolve(path.dirname(mdx), normalizedImport);
  let resolves = false;
  for (const extension of [".tsx", ".ts", ".jsx", ".js"]) resolves ||= await exists(`${resolvedImport}${extension}`);
  if (!resolves) report(`${path.relative(root, mdx)}: import '${normalizedImport}' does not resolve to a source file`);
  if (!/\bstory\.WithControl\b/.test(content)) report(`${path.relative(root, mdx)}: missing <story.WithControl /> preview`);
}

const requiredDocs: Record<string, number> = { primitives: 56, widgets: 53, charts: 11, figures: 22, blocks: 17, foundations: 6 };
const requiredStoryMinimums: Record<string, number> = { primitives: 56, charts: 11, figures: 22, blocks: 17 };
for (const [category, minimum] of Object.entries(requiredDocs)) {
  const dir = path.join(docs, "content/docs", category);
  const pages = (await filesUnder(dir, ".mdx")).filter((file) => !file.endsWith("/index.mdx")).length;
  if (pages < minimum) report(`docs ${category}: found ${pages} MDX pages; expected at least ${minimum}`);
}
for (const [category, minimum] of Object.entries(requiredStoryMinimums)) {
  const count = storyCategories.get(category) ?? 0;
  if (count < minimum) report(`stories ${category}: found ${count}; expected at least ${minimum}`);
}

const categoryPages = new Map<string, Set<string>>();
for (const category of [...categoryFolders, "foundations"]) {
  const dir = path.join(docs, "content/docs", category);
  categoryPages.set(category, new Set((await filesUnder(dir, ".mdx")).map((file) => path.basename(file, ".mdx"))));
}
const metaFiles = await filesUnder(path.join(docs, "content/docs"), "meta.json");
for (const file of metaFiles) {
  const parent = path.basename(path.dirname(file));
  const pages = categoryPages.get(parent);
  if (!pages) continue;
  const meta = JSON.parse(await read(file)) as { pages?: unknown };
  const nav = Array.isArray(meta.pages) ? meta.pages : [];
  for (const entry of nav) {
    if (typeof entry !== "string") continue;
    const normalized = entry.replace(/^\(.+\)\//, "");
    if (!normalized.startsWith("...") && !pages.has(normalized) && !["index", "credits"].includes(normalized)) report(`${path.relative(root, file)}: navigation entry '${entry}' has no MDX page`);
  }
  for (const page of pages) if (page !== "meta" && !nav.includes(page) && !nav.includes(`...${page}`)) report(`${path.relative(root, file)}: MDX page '${page}' is not included in navigation`);
}
const rootMeta = path.join(docs, "content/docs/meta.json");
if (!(await exists(rootMeta))) report("apps/docs/content/docs/meta.json: missing root navigation");
else {
  const meta = JSON.parse(await read(rootMeta)) as { pages?: unknown };
  const nav = Array.isArray(meta.pages) ? meta.pages : [];
  for (const page of ["index", "credits", ...categoryFolders, "foundations"]) if (!nav.includes(page)) report(`root docs navigation omits '${page}'`);
}

const requiredAttribution: Array<[string, string[]]> = [
  ["README.md", ["Gustavo Fior", "@gustavo-fior", "Foglamp Labs", "foglamp-labs/foglamp"]],
  ["apps/docs/src/routes/index.tsx", ["Gustavo Fior", "@gustavo-fior", "Foglamp Labs", "foglamp-labs/foglamp"]],
  ["apps/docs/src/components/story-panel.tsx", ["Gustavo Fior", "@gustavo-fior", "Foglamp Labs", "foglamp-labs/foglamp"]],
  ["packages/design-system/src/blocks/marketing/chrome/navbar.tsx", ["Gustavo Fior", "Foglamp Labs"]],
  ["packages/design-system/src/blocks/marketing/chrome/footer.tsx", ["Gustavo Fior", "Foglamp Labs"]],
  ["apps/docs/content/docs/credits.mdx", ["Gustavo Fior", "@gustavo-fior", "Abdul Haidar", "Foglamp Labs"]],
];
for (const [relative, markers] of requiredAttribution) {
  const file = path.join(root, relative);
  if (!(await exists(file))) { report(`${relative}: required attribution surface is missing`); continue; }
  const body = await read(file);
  for (const marker of markers) if (!body.toLowerCase().includes(marker.toLowerCase())) report(`${relative}: missing attribution marker '${marker}'`);
}
if (registry.name !== "framerock") report("registry.json: name must be framerock");
if (typeof registry.author !== "string" || !/tailrocks/i.test(registry.author)) report("registry.json: author must identify Tailrocks as publisher");
if (registry.homepage !== "https://github.com/tailrocks/framerock") report("registry.json: homepage must point to https://github.com/tailrocks/framerock");
const registryContributors = Array.isArray(registry.contributors) ? registry.contributors : [];
for (const name of ["Gustavo Fior", "Abdul Haidar", "Foglamp Labs"]) {
  if (!registryContributors.some((person) => typeof person === "object" && person !== null && "name" in person && person.name === name)) {
    report(`registry.json: contributors must retain original creator attribution for '${name}'`);
  }
}
const designManifest = JSON.parse(await read(path.join(root, "packages/design-system/package.json"))) as { name?: unknown; homepage?: unknown };
if (designManifest.name !== "@tailrocks/framerock") report("packages/design-system/package.json: package name must be @tailrocks/framerock");
if (designManifest.homepage !== "https://github.com/tailrocks/framerock") report("packages/design-system/package.json: homepage must point to Tailrocks Framerock");
const portalRoot = await read(path.join(docs, "src/routes/__root.tsx"));
if (!portalRoot.includes("Framerock — Web UI Design System by Tailrocks, extracted from Foglamp by Gustavo Fior & Foglamp Labs")) report("apps/docs root metadata must identify the Framerock portal and original creators");
const portalIndex = await read(path.join(docs, "content/docs/index.mdx"));
if (!portalIndex.includes("title: Framerock") || !portalIndex.includes("@tailrocks/framerock")) report("apps/docs homepage must use Framerock branding and package scope");

// Detect unresolved workspace aliases in parsed registry entry fields, without confusing the
// catalog's alias metadata with installable registry items.
for (const item of registryItems) {
  if (!Array.isArray(item.files)) continue;
  for (const entry of item.files) {
    if (!entry || typeof entry !== "object" || !("path" in entry) || typeof entry.path !== "string") continue;
    if (entry.path.startsWith("@/") || entry.path.startsWith("~/")) report(`registry item '${String(item.name)}': unresolved workspace alias path '${entry.path}'`);
  }
}

if (historicalChartAliasFixture) console.log("Fixture mode: area-chart registryItem changed in memory to historical invalid prefix; source file is untouched.");
if (browserPromptsFixture) console.log("Fixture mode: historical prompts barrel import checked in memory; source files are untouched.");
console.log(`Portal contract: ${storyFiles.length} stories (${[...storyCategories].map(([name, count]) => `${name}=${count}`).join(", ")}), ${registryItems.length} registry items, ${metaFiles.length} navigation manifests.`);
console.log("Coverage: story IDs and uniqueness, registry/catalog membership, story MDX imports and WithControl previews, docs navigation coverage, required attribution markers, registry source-path aliases, browser imports of server-only prompts modules.");
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  console.error(`Portal contract failed with ${errors.length} issue(s).`);
  process.exitCode = 1;
} else console.log("Portal contract passed.");
