import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const docsRoot = path.join(root, 'apps/docs/content/docs');
const storiesRoot = path.join(root, 'apps/docs/src/stories');
const componentPath = path.join(root, 'apps/docs/src/components/provenance');
const catalog = JSON.parse(await readFile(path.join(root, 'apps/docs/public/r/story-items.json'), 'utf8'));
const catalogById = new Map(catalog.items.map((item) => [item.registryItem, item]));
const categories = ['primitives', 'widgets', 'charts', 'figures', 'blocks'];
const records = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(file);
    return [file];
  }));
  return nested.flat();
}

for (const category of categories) {
  const storyDir = path.join(storiesRoot, category);
  for (const storyFile of (await walk(storyDir)).filter((file) => file.endsWith('.story.tsx'))) {
    const relative = path.relative(storyDir, storyFile).replace(/\.story\.tsx$/, '.mdx');
    const mdxFile = path.join(docsRoot, category, relative);
    const story = await readFile(storyFile, 'utf8');
    const match = story.match(/\bregistryItem:\s*['"]([^'"]+)['"]/);
    if (!match) throw new Error(`${path.relative(root, storyFile)} has no literal registryItem`);
    const registryItem = match[1];
    const metadata = catalogById.get(registryItem);
    if (!metadata) throw new Error(`${path.relative(root, storyFile)} maps to missing catalog item ${registryItem}`);
    const mdx = await readFile(mdxFile, 'utf8');
    records.push({ mdxFile, storyFile, registryItem, metadata, mdx });
  }
}

if (records.length !== 167) throw new Error(`Expected 167 story-backed component pages, found ${records.length}`);
const ids = records.map(({ registryItem }) => registryItem);
if (ids.some((id) => !catalogById.has(id))) throw new Error('One or more story pages do not map to an authoritative catalog item');

for (const record of records) {
  const { mdxFile, registryItem, metadata } = record;
  const pinnedUrl = metadata.upstreamUrl ?? metadata.inspirationUrl;
  if (!pinnedUrl?.includes(`/blob/${metadata.upstreamCommit}/`)) {
    throw new Error(`${registryItem} has no exact source or inspiration URL pinned to its catalog commit`);
  }
  if (!record.mdx.includes('<story.WithControl />')) {
    throw new Error(`${path.relative(root, mdxFile)} has no live story preview anchor`);
  }
  if (!record.mdx.includes('StoryProvenance') && /^import\s+\{\s*StoryProvenance\s*\}/m.test(record.mdx)) {
    throw new Error(`${path.relative(root, mdxFile)} imports StoryProvenance without rendering it`);
  }
  const importPath = path.relative(path.dirname(mdxFile), componentPath).split(path.sep).join('/');
  const normalizedImport = importPath.startsWith('.') ? importPath : `./${importPath}`;
  const originalMarker = metadata.provenance === 'tailrocks-original' ? ' notUpstream="This is not an upstream Foglamp source file."' : '';
  const rendered = `<StoryProvenance registryItem="${registryItem}" provenanceLabel="${metadata.provenanceLabel}" sourceUrl="${pinnedUrl}" repositoryUrl="https://github.com/foglamp-labs/foglamp" foglampWebsite="https://foglamp.dev" creatorWebsite="https://gustavofior.com"${originalMarker} />`;
  let updated = record.mdx;
  const storyImportMatch = updated.match(/^import\s+\{\s*story\s*\}\s+from\s+(['"][^'"\n]+['"]);?\s*$/m);
  if (!storyImportMatch) throw new Error(`${path.relative(root, mdxFile)} has no literal story import`);
  const frontmatterMatch = updated.match(/^---\s*\n[\s\S]*?\n---\s*\n/);
  if (!frontmatterMatch) throw new Error(`${path.relative(root, mdxFile)} has no frontmatter boundary`);
  const body = updated.slice(frontmatterMatch[0].length)
    .replace(/^import\s+\{\s*(?:story|StoryProvenance)\s*\}\s+from\s+['"][^'"\n]+['"];?\s*\n?/gm, '')
    .replace(/<StoryProvenance\b[^>]*\/>/, rendered)
    .replace(/^\s+/, '');
  const imports = `${storyImportMatch[0]}\nimport { StoryProvenance } from '${normalizedImport}';\n\n`;
  updated = `${frontmatterMatch[0]}\n${imports}${body}`;
  if (!updated.includes(rendered) || !updated.includes(`import { StoryProvenance } from '${normalizedImport}';`) || updated.indexOf('import { StoryProvenance') > updated.indexOf('<story.WithControl />')) {
    throw new Error(`${path.relative(root, mdxFile)} could not be safely updated`);
  }
  if (updated !== record.mdx) await writeFile(mdxFile, updated);
}

console.log(`Synchronized provenance from story/catalog mappings for ${records.length} component MDX pages (${catalog.items.length} catalog entries).`);
