/**
 * Build a deterministic, source-complete shadcn registry from the Foglamp
 * design-system package. Original design by Gustavo Fior (@gustavo-fior),
 * Abdul Haidar, and Foglamp Labs; extracted from foglamp-labs/foglamp.
 */
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { registryItemSchema, registrySchema } from "@shadcn/registry/schema";

type RegistryFile = { path: string; target: string; type: string; content: string };
type Provenance = { provenance: string; provenanceLabel: string; upstreamCommit: string; upstreamPath?: string; upstreamUrl?: string; inspirationPath?: string; inspirationUrl?: string };
type RegistryItem = Provenance & {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
  devDependencies?: string[];
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "../../..");
const sourceRoot = path.join(root, "packages/design-system/src");
const registryPath = path.join(root, "packages/registry/registry.json");
const outputDir = path.join(root, "apps/docs/public/r");
const designManifest = JSON.parse(await readFile(path.join(root, "packages/design-system/package.json"), "utf8"));
const docsManifest = JSON.parse(await readFile(path.join(root, "apps/docs/package.json"), "utf8"));
const registryWorkspaceManifest = JSON.parse(await readFile(path.join(root, "packages/registry/package.json"), "utf8"));
const provenanceManifest = JSON.parse(await readFile(path.join(root, "scripts/provenance/manifest.json"), "utf8")) as {
  entries: Array<{ path: string; secondary_upstream_paths?: string[] }>;
};
const provenanceByRelative = new Map(
  provenanceManifest.entries.map((entry) => [entry.path.replace(/^packages\/design-system\/src\//, ""), entry]),
);
const workspaceLock = await readFile(path.join(root, "bun.lock"), "utf8");
const excluded = /(?:\.test|\.spec)\.[cm]?[jt]sx?$|(?:^|\/)verify-source(?:\.[^/]*)?$|(?:^|\/)tsconfig\.json$/;
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const fontSetupPath = "styles/font-setup.css";

function mediaType(filePath: string, bytes: Buffer): string | undefined {
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (bytes.toString("ascii", 0, 6) === "GIF87a" || bytes.toString("ascii", 0, 6) === "GIF89a") return "image/gif";
  if (bytes.length >= 12 && bytes.toString("ascii", 4, 8) === "ftyp" && /^(?:avif|avis)$/.test(bytes.toString("ascii", 8, 12))) return "image/avif";
  if (path.extname(filePath).toLowerCase() === ".svg") return "image/svg+xml";
  switch (path.extname(filePath).toLowerCase()) {
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".webp": return "image/webp";
    case ".gif": return "image/gif";
    case ".avif": return "image/avif";
    case ".svg": return "image/svg+xml";
    default: return undefined;
  }
}

async function walkImages(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map(async (entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkImages(absolute);
    return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [absolute] : [];
  }));
  return files.flat();
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map(async (entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    const relative = path.relative(sourceRoot, absolute).split(path.sep).join("/");
    return extensions.has(path.extname(entry.name)) && !excluded.test(relative) ? [absolute] : [];
  }));
  return files.flat();
}

const allSourceFiles = await walk(sourceRoot);
const absoluteByRelative = new Map(allSourceFiles.map((file) => [path.relative(sourceRoot, file).split(path.sep).join("/"), file]));
const publicRoot = path.join(root, "apps/docs/public");
const assetDataUris = new Map<string, string>();
for (const file of [...await walkImages(sourceRoot), ...await walkImages(publicRoot)]) {
  const bytes = await readFile(file);
  const mime = mediaType(file, bytes);
  if (!mime) continue;
  const isSourceAsset = file.startsWith(`${sourceRoot}${path.sep}`);
  const reference = isSourceAsset
    ? path.relative(sourceRoot, file).split(path.sep).join("/")
    : `/${path.relative(publicRoot, file).split(path.sep).join("/")}`;
  assetDataUris.set(reference, `data:${mime};base64,${bytes.toString("base64")}`);
}
const interRegular = await readFile(path.join(root, "packages/design-system/src/assets/InterVariable.woff2"));
const interItalic = await readFile(path.join(root, "packages/design-system/src/assets/InterVariable-Italic.woff2"));
const fontNotice = (await readFile(path.join(root, "THIRD-PARTY-NOTICES.md"), "utf8")).replaceAll("*/", "* /");
const fontSetupContent = `/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 * Authored by Tailrocks; inspired by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev).
 */

@import "@fontsource-variable/geist-mono";\n@import "@fontsource-variable/host-grotesk";\n@font-face { font-family: Inter; src: url("data:font/woff2;base64,${interRegular.toString("base64")}") format("woff2"); font-style: normal; font-weight: 100 900; font-display: swap; }\n@font-face { font-family: Inter; src: url("data:font/woff2;base64,${interItalic.toString("base64")}") format("woff2"); font-style: italic; font-weight: 100 900; font-display: swap; }\n@font-face { font-family: "Inter Fallback"; src: local("Arial"); ascent-override: 89.79%; descent-override: 22.36%; line-gap-override: 0.00%; size-adjust: 107.89%; }\n@font-face { font-family: "Geist Mono Fallback"; src: local("Arial"); ascent-override: 74.67%; descent-override: 21.92%; line-gap-override: 0.00%; size-adjust: 134.59%; }\n@font-face { font-family: "Host Grotesk Fallback"; src: local("Arial"); ascent-override: 96.69%; descent-override: 30.01%; line-gap-override: 0.00%; size-adjust: 104.98%; }\n:root { --font-sans: Inter, "Inter Fallback", sans-serif; --font-geist-mono: "Geist Mono Variable", "Geist Mono Fallback", monospace; --font-host-grotesk: "Host Grotesk Variable", "Host Grotesk Fallback", sans-serif; }\n@theme inline { --font-mono: var(--font-geist-mono); }\n\n/* Apache-2.0 Section 4(b) Registry Packaging Notice: Authored by Tailrocks; inspired by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev) at https://github.com/foglamp-labs/foglamp/tree/7d7e6609108019a74902858d4b07c24825c6318b. SPDX-License-Identifier: Apache-2.0 | SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)\n\n${fontNotice}\n*/\n`;

function targetPath(relative: string): string {
  return `src/components/framerock/${relative}`;
}

function resolveLocal(from: string, request: string): string | undefined {
  if (!request.startsWith(".") && !request.startsWith("@/") && !(request.startsWith("@tailrocks/framerock/") || request.startsWith("@foglamp/design-system/"))) return undefined;
  const base = (request.startsWith("@tailrocks/framerock/") || request.startsWith("@foglamp/design-system/"))
    ? request.replace(/^@(?:tailrocks\/framerock|foglamp\/design-system)\//, "")
    : request.startsWith("@/")
      ? path.posix.join("ui", request.slice(2))
      : path.posix.normalize(path.posix.join(path.posix.dirname(from), request));
  const candidates = [base, ...[...extensions].map((ext) => `${base}${ext}`), ...[".ts", ".tsx"].map((ext) => `${base}/index${ext}`)];
  return candidates.find((candidate) => absoluteByRelative.has(candidate));
}

function classify(relative: string): { prefix: string; type: string } {
  if (relative === "index.ts") return { prefix: "framerock", type: "registry:internal" };
  if (relative.startsWith("ui/")) return { prefix: "ui", type: "registry:ui" };
  if (relative.startsWith("widgets/")) return { prefix: "widget", type: "registry:component" };
  if (relative.startsWith("charts/")) return { prefix: "chart", type: "registry:component" };
  if (relative.startsWith("blocks/")) return { prefix: "block", type: "registry:block" };
  if (relative.startsWith("icons/")) return { prefix: "icon", type: "registry:component" };
  if (relative.startsWith("hud/")) return { prefix: "hud", type: "registry:component" };
  if (relative.startsWith("styles/")) return { prefix: "style", type: "registry:style" };
  if (relative.startsWith("hooks/")) return { prefix: "hook", type: "registry:hook" };
  if (relative.startsWith("lib/")) return { prefix: "utility", type: "registry:lib" };
  return { prefix: "asset", type: "registry:internal" };
}

function itemName(relative: string): string {
  if (relative === "index.ts") return "framerock-source";
  const { prefix } = classify(relative);
  const stem = relative.replace(/\.(tsx?|jsx?|css|woff2|webp|svg)$/, "").split("/").slice(1).join("-") || path.basename(relative).replace(/\.[^.]+$/, "");
  const normalized = stem.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  return `${prefix}-${prefix === "block" ? normalized.replace(/-block$/, "") : normalized}`;
}

function isPublicEntry(relative: string): boolean {
  // Exclude root index, pure barrel index.ts files, ambient .d.ts files, CSS modules, and internal helpers.
  if (
    relative === "index.ts"
    || relative.endsWith("/index.ts")
    || relative.endsWith(".d.ts")
    || relative.endsWith(".module.css")
  ) {
    return false;
  }
  return relative !== "ui/button-styles.ts"
    && relative !== "lib/prompts/index.ts"
    && relative !== "lib/prompts/normalize.ts"
    && relative !== "blocks/scan/verify-source.ts";
}

function toType(relative: string): string {
  const ext = path.extname(relative);
  if (ext === ".css") return "registry:style";
  if ([".woff2", ".webp", ".svg"].includes(ext)) return "registry:file";
  return "registry:component";
}

function sourceModuleRequests(contents: string, filePath: string): Array<{ request: string; start: number; end: number }> {
  const extension = path.extname(filePath);
  const scriptKind = extension === ".tsx" || extension === ".jsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(filePath, contents, ts.ScriptTarget.Latest, true, scriptKind);
  const found: Array<{ request: string; start: number; end: number }> = [];
  const add = (node: ts.Expression | undefined) => {
    if (node && ts.isStringLiteralLike(node)) found.push({ request: node.text, start: node.getStart(source) + 1, end: node.getEnd() - 1 });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) add(node.moduleSpecifier);
    else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) add(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

function rewriteLocalImages(contents: string, sourceRelative: string): string {
  const extension = path.extname(sourceRelative);
  const scriptKind = extension === ".tsx" || extension === ".jsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(sourceRelative, contents, ts.ScriptTarget.Latest, true, scriptKind);
  const edits: Array<{ start: number; end: number; text: string }> = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) {
      const uri = assetDataUris.get(node.text);
      if (uri && node.parent && (ts.isJsxAttribute(node.parent) || ts.isCallExpression(node.parent) || ts.isPropertyAssignment(node.parent))) {
        edits.push({ start: node.getStart(source) + 1, end: node.getEnd() - 1, text: uri });
      }
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "href" && ts.isNewExpression(node.expression)) {
      const constructor = node.expression;
      if (ts.isIdentifier(constructor.expression) && constructor.expression.text === "URL") {
        const request = constructor.arguments?.[0];
        const importer = constructor.arguments?.[1];
        if (request && ts.isStringLiteralLike(request) && importer && importer.getText(source) === "import.meta.url") {
          const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceRelative), request.text));
          const uri = assetDataUris.get(resolved);
          if (uri) edits.push({ start: node.getStart(source), end: node.getEnd(), text: JSON.stringify(uri) });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  let result = contents;
  for (const edit of edits.sort((a, b) => b.start - a.start)) result = `${result.slice(0, edit.start)}${edit.text}${result.slice(edit.end)}`;
  return result;
}

function getExternalDependencies(files: RegistryFile[]): string[] {
  const found = new Set<string>();
  const requests = files.flatMap((file) => {
    if (file.path.endsWith(".css")) {
      return [
        ...[...file.content.matchAll(/@import\s+(?:url\()?\s*["']([^"']+)["']/g)].map((match) => match[1]),
        ...[...file.content.matchAll(/@plugin\s+["']([^"']+)["']/g)].map((match) => match[1]),
      ];
    }
    if (/\.[jt]sx?$/.test(file.path)) return sourceModuleRequests(file.content, file.path).map(({ request }) => request);
    return [];
  });
  for (const request of requests) {
    if (request.startsWith(".") || request.startsWith("@/") || (request.startsWith("@tailrocks/framerock/") || request.startsWith("@foglamp/design-system/")) || request.startsWith("node:")) continue;
    const name = request.startsWith("@") ? request.split("/").slice(0, 2).join("/") : request.split("/")[0];
    if (name) found.add(name);
  }
  if (found.has("react")) found.add("react-dom");
  if (found.has("streamdown")) found.add("type-fest");
  if (found.has("@base-ui/react")) {
    // Keep Base UI's geometry runtime aligned with the source package pins
    // instead of letting a fresh registry install drift through compatible
    // semver ranges.
    for (const name of ["@floating-ui/core", "@floating-ui/dom", "@floating-ui/react-dom", "@floating-ui/utils", "use-sync-external-store"]) found.add(name);
  }
  return [...found].sort().map((name) => `${name}@${installedVersion(name)}`);
}

function installedVersion(name: string): string {
  const manifests = [designManifest, docsManifest, registryWorkspaceManifest];
  const declared = manifests
    .map((manifest) => manifest.dependencies?.[name] ?? manifest.devDependencies?.[name] ?? manifest.peerDependencies?.[name])
    .find((value) => typeof value === "string" && !value.startsWith("workspace:"));
  const exact = typeof declared === "string" && /^(?:\d+\.){2}\d+(?:-[0-9A-Za-z.-]+)?$/.test(declared)
    ? declared
    : undefined;
  if (exact) return exact;

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lockEntry = new RegExp(`"${escapedName}"\\s*:\\s*\\[\\s*"([^"]+)"`).exec(workspaceLock)?.[1];
  const lockedVersion = lockEntry?.slice(lockEntry.lastIndexOf("@") + 1);
  if (lockedVersion && /^(?:\d+\.){2}\d+(?:-[0-9A-Za-z.-]+)?$/.test(lockedVersion)) return lockedVersion;
  throw new Error(`No exact installed version for registry dependency ${name}; pin it in the source workspace metadata first.`);
}

function rewriteImports(contents: string, sourceRelative: string): string {
  const edits = sourceModuleRequests(contents, sourceRelative).flatMap(({ request, start, end }) => {
    const resolved = resolveLocal(sourceRelative, request);
    if (!resolved) return [];
    const from = targetPath(sourceRelative).replace(/^src\//, "").replace(/\.(tsx?|jsx?)$/, "");
    const target = targetPath(resolved).replace(/^src\//, "").replace(/\.(tsx?|jsx?)$/, "");
    const relative = path.posix.relative(path.posix.dirname(from), target);
    return [{ start, end, text: relative.startsWith(".") ? relative : `./${relative}` }];
  });
  let result = contents;
  for (const edit of edits.sort((a, b) => b.start - a.start)) result = `${result.slice(0, edit.start)}${edit.text}${result.slice(edit.end)}`;
  return result;
}

// Validate that every distributed file retains its leading legal header and
// append a single-line EOF backup notice on TS/TSX/CSS files so shadcn's
// transform cannot strip the required Apache-2.0 attribution markers.
function retainInstalledNotice(content: string, file: string, upstreamPath?: string): string {
  if (file === fontSetupPath) return content;
  const header = content.match(/^\/\*\*[\s\S]*?\*\//)?.[0];
  if (!header) throw new Error(`Missing legal header: ${file}`);
  const refUrl = upstreamPath
    ? `https://github.com/foglamp-labs/foglamp/blob/${commit}/${upstreamPath}`
    : `https://github.com/foglamp-labs/foglamp/tree/${commit}`;
  return `${content.trimEnd()}\n/* Apache-2.0 Section 4(b) Registry Packaging Notice: Modified by Tailrocks for standalone @framerock registry installation (rewritten import specifiers); 1:1 visual design and behavior preserved from Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev) at ${refUrl}. SPDX-License-Identifier: Apache-2.0 | SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev) */\n`;
}

async function closure(entry: string): Promise<string[]> {
  const visited = new Set<string>();
  const visit = async (relative: string): Promise<void> => {
    if (visited.has(relative)) return;
    visited.add(relative);
    const source = await readFile(absoluteByRelative.get(relative)!, "utf8");
    for (const { request } of sourceModuleRequests(source, relative)) {
      const resolved = resolveLocal(relative, request);
      if (resolved) await visit(resolved);
    }
    for (const ref of ts.preProcessFile(source, true, true).referencedFiles) {
      const request = ref.fileName.startsWith(".") ? ref.fileName : `./${ref.fileName}`;
      const resolved = resolveLocal(relative, request);
      if (resolved) await visit(resolved);
    }
    if (source.includes("@tabler/icons-react") && absoluteByRelative.has("lib/react-shim.d.ts")) {
      await visit("lib/react-shim.d.ts");
    }
  };
  await visit(entry);
  // Global CSS is a separate installable entry so the canonical Inter bytes
  // are embedded exactly once. It imports effects and font setup itself.
  if (entry === "styles/globals.css" && absoluteByRelative.has("styles/effects.css")) visited.add("styles/effects.css");
  return [...visited].sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
}

const commit = "7d7e6609108019a74902858d4b07c24825c6318b";
function provenanceFor(source: string, relative: string): Provenance {
  const tag = (key: string) => source.match(new RegExp(`^ \\* @${key} (.+)$`, "m"))?.[1];
  const provenance = tag("provenance");
  if (!provenance || !["copied-1-to-1", "modified", "tailrocks-original"].includes(provenance)) throw new Error("Missing provenance header");
  const provenanceLabel = provenance === "copied-1-to-1" ? "1:1 Copied" : provenance === "modified" ? "Modified (Import/Prop Decoupled)" : "Newly Added by Tailrocks";
  const upstreamPath = tag("upstream-path");
  const upstreamUrl = tag("upstream-url");
  const manifestEntry = provenanceByRelative.get(relative);
  const inspirationPath = provenance === "tailrocks-original"
    ? manifestEntry?.secondary_upstream_paths?.[0]
    : undefined;
  return { provenance, provenanceLabel, upstreamCommit: commit, ...(upstreamPath && upstreamUrl ? { upstreamPath, upstreamUrl } : {}), ...(inspirationPath ? { inspirationPath, inspirationUrl: `https://github.com/foglamp-labs/foglamp/blob/${commit}/${inspirationPath}` } : {}) };
}

const items: RegistryItem[] = [];
for (const relative of [...absoluteByRelative.keys()].filter(isPublicEntry).sort((a, b) => a < b ? -1 : a > b ? 1 : 0)) {
  if (relative.includes("/")) {
    // Each source module is directly installable; source barrels remain
    // available through the individual exported component entries.
  }
  const name = itemName(relative);
  const itemFiles: RegistryFile[] = [];
  const files = await closure(relative);
  let combined = "";
  for (const file of files) {
    const source = await readFile(absoluteByRelative.get(file)!, "utf8");
    let content = file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")
      ? rewriteLocalImages(rewriteImports(source, file), file)
      : source;
    if (relative === "styles/globals.css" && file === "styles/globals.css") {
      content = source.replace(
        '@import "shadcn/tailwind.css";',
        '@import "shadcn/tailwind.css";\n@import "./effects.css";\n@import "./font-setup.css";',
      );
    }
    if (file === "styles/effects.css") {
      content = content.replace(
        /@source\s+["'](?:\.\.\/)+node_modules\/streamdown\/dist\/\*\.js["'];/,
        '@source "../../../../node_modules/streamdown/dist/*.js";',
      );
    }
    if (source.includes("@provenance copied-1-to-1") && content !== source) {
      content = content.replace(" */", " * Apache-2.0 Section 4(b) Registry Packaging Notice: Tailrocks modified comments and/or imports or assets for registry distribution.\n */");
    }
    const fileUpstreamPath = source.match(/^ \* @upstream-path (.+)$/m)?.[1];
    content = retainInstalledNotice(content, file, fileUpstreamPath);
    itemFiles.push({ path: targetPath(file), target: targetPath(file), type: toType(file), content });
  }
  if (relative === "styles/globals.css") {
    itemFiles.push({ path: targetPath(fontSetupPath), target: targetPath(fontSetupPath), type: "registry:style", content: retainInstalledNotice(fontSetupContent, fontSetupPath) });
  }
  const { type } = classify(relative);
  const dependencies = getExternalDependencies(itemFiles);
  const defaultTitle = path.basename(relative).replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = relative === "blocks/marketing/demo/index.tsx" ? "Dashboard Demo" : defaultTitle;
  items.push({
    ...provenanceFor(await readFile(absoluteByRelative.get(relative)!, "utf8"), relative),
    name,
    type,
    title,
    description: `${relative === "styles/globals.css" ? "Install this style once and import @/components/framerock/styles/globals.css to activate Foglamp tokens, effects, and fonts. " : "Install style-globals once and import @/components/framerock/styles/globals.css to activate Foglamp tokens, effects, and fonts. "}Foglamp source module from ${relative}, designed by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs.`,
    files: itemFiles,
    ...(dependencies.length ? { dependencies } : {}),
    ...(relative.endsWith(".tsx") ? { devDependencies: [`@types/react@${installedVersion("@types/react")}`] } : {}),
  });
}

// 22 marketing figure variants get individual installable ids while sharing
// the exact source module that exports their implementation.
const figureSources: Record<string, string> = {
  "costs-cards": "blocks/marketing/figures/figures-scenes.tsx",
  ...Object.fromEntries(["stair", "fan", "shelf", "total", "chart", "alert", "table", "tabs", "shares", "backdrop", "donut", "area", "small", "flow"].map((id) => [`costs-${id}`, "blocks/marketing/figures/figures-costs.tsx"])),
  "traces-story": "blocks/marketing/figures/figures-scenes.tsx",
  ...Object.fromEntries(["chat", "xray", "steps", "inspector", "graph"].map((id) => [`traces-${id}`, "blocks/marketing/figures/figures-traces.tsx"])),
  "quality-review": "blocks/marketing/figures/figures-scenes.tsx",
};
for (const [slug, source] of Object.entries(figureSources)) {
  const base = items.find((item) => item.name === itemName(source));
  if (!base) throw new Error(`Figure source not found for ${slug}: ${source}`);
  const [section, variant] = slug.split("-");
  items.push({
    ...base,
    name: `figure-${section}-${variant}`,
    type: "registry:component",
    title: `${section} ${variant}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Foglamp ${section} figure ${variant}, designed by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs.`,
  });
}

// Story-facing logical widgets whose source module exports several named
// widgets receive stable install IDs of their own.
const logicalWidgets: Record<string, string> = {
  "page-header": "widgets/page-parts.tsx",
  "stat-card": "widgets/page-parts.tsx",
  "range-picker": "widgets/range-picker.tsx",
  "code-block": "widgets/code-block.tsx",
  markdown: "widgets/markdown.tsx",
  "animated-api-key": "widgets/animated-api-key.tsx",
  "context-chip": "widgets/context-chip.tsx",
  "quota-card-view": "widgets/quota-card.tsx",
  "theme-switcher": "widgets/theme-switcher.tsx",
  "user-menu-view": "widgets/user-menu.tsx",
  toolbar: "widgets/data-table.tsx",
  "search-input": "widgets/data-table.tsx",
  "toggle-chip": "widgets/data-table.tsx",
  "filter-select": "widgets/data-table.tsx",
  "sortable-head": "widgets/data-table.tsx",
  "pagination-footer": "widgets/data-table.tsx",
};
for (const [slug, source] of Object.entries(logicalWidgets)) {
  if (items.some((item) => item.name === `widget-${slug}`)) continue;
  const base = items.find((item) => item.name === itemName(source));
  if (!base) throw new Error(`Widget source not found for ${slug}: ${source}`);
  items.push({ ...base, name: `widget-${slug}`, type: "registry:component", title: slug.replace(/\b\w/g, (c) => c.toUpperCase()), description: `Foglamp ${slug.replace(/-/g, " ")} widget designed by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs.` });
}

const names = new Set<string>();
for (const item of items) {
  if (names.has(item.name)) throw new Error(`Registry name collision: ${item.name}`);
  names.add(item.name);
}
const registry = JSON.parse(await readFile(registryPath, "utf8"));
registry.name = "framerock";
registry.homepage = "https://github.com/tailrocks/framerock";
registry.author = "Tailrocks (https://github.com/tailrocks) — Original UI design & implementation by Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs (https://foglamp.dev)";
registry.license = "Apache-2.0";
// The root registry is an index. Full content, targets, and dependency graphs
// live in each matching static /r/<name>.json registry-item payload.
registry.items = items.map(({ name, type, title, description, provenance, provenanceLabel, upstreamCommit, upstreamPath, upstreamUrl, inspirationPath, inspirationUrl }) => ({ name, type, title, description, provenance, provenanceLabel, upstreamCommit, upstreamPath, upstreamUrl, inspirationPath, inspirationUrl }));
// This schema strips custom registry metadata such as author and license from
// its parsed result. Validate the original index without replacing it.
registrySchema.parse(registry);
const payloads = items.map((item) => {
  const payload = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    author: registry.author,
    homepage: registry.homepage,
    license: registry.license,
    provenance: item.provenance, provenanceLabel: item.provenanceLabel, upstreamCommit: item.upstreamCommit,
    ...(item.upstreamPath ? { upstreamPath: item.upstreamPath, upstreamUrl: item.upstreamUrl } : {}),
    ...(item.inspirationPath ? { inspirationPath: item.inspirationPath, inspirationUrl: item.inspirationUrl } : {}),
    files: item.files,
    ...(item.dependencies ? { dependencies: item.dependencies } : {}),
    ...(item.devDependencies ? { devDependencies: item.devDependencies } : {}),
  };
  registryItemSchema.parse(payload);
  for (const file of item.files) {
    if (path.extname(file.path).match(/\.(?:woff2?|ttf|otf|png|jpe?g|webp|gif|avif)$/i)) {
      throw new Error(`Binary asset escaped as a registry file in ${item.name}: ${file.path}`);
    }
    if (file.type === "registry:file" && !("target" in file)) {
      throw new Error(`Registry file is missing its required target in ${item.name}: ${file.path}`);
    }
  }
  return { name: item.name, payload };
});
await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
for (const { name, payload } of payloads) {
  await writeFile(path.join(outputDir, `${name}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}
const stories = items.map((item) => ({
  id: item.name,
  title: item.title,
  source: item.files.find((file) => file.path.endsWith(".tsx") || file.path.endsWith(".ts"))?.path ?? item.files[0]?.path,
  type: item.type,
  registryItem: item.name,
  provenance: item.provenance, provenanceLabel: item.provenanceLabel, upstreamCommit: item.upstreamCommit,
  ...(item.upstreamPath ? { upstreamPath: item.upstreamPath, upstreamUrl: item.upstreamUrl } : {}),
  ...(item.inspirationPath ? { inspirationPath: item.inspirationPath, inspirationUrl: item.inspirationUrl } : {}),
}));
await writeFile(path.join(outputDir, "story-items.json"), `${JSON.stringify({
  type: "foglamp:story-catalog",
  description: "Story aliases for source modules. Install ids match registryItem exactly.",
  items: stories,
}, null, 2)}\n`);
await writeFile(path.join(outputDir, "framerock.json"), `${JSON.stringify(registry, null, 2)}\n`);
await writeFile(path.join(outputDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Built ${items.length} shadcn registry items and ${stories.length} story catalog entries with full source/import closure.`);
