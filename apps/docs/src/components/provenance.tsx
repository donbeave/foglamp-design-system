import framerockRegistry from '../../../../packages/registry/registry.json';

const pinnedCommit = '7d7e6609108019a74902858d4b07c24825c6318b';
const upstreamRepository = 'https://github.com/foglamp-labs/foglamp';
const catalogItems = framerockRegistry.items as Array<{
  name: string;
  provenanceLabel: string;
  upstreamUrl?: string;
  inspirationUrl?: string;
}>;
const itemsByRegistryId = new Map(catalogItems.map((item) => [item.name, item]));

export function StoryProvenance({ registryItem, provenanceLabel, sourceUrl, repositoryUrl, foglampWebsite, creatorWebsite, notUpstream }: { registryItem: string; provenanceLabel?: string; sourceUrl?: string; repositoryUrl?: string; foglampWebsite?: string; creatorWebsite?: string; notUpstream?: string }) {
  const item = itemsByRegistryId.get(registryItem);
  if (!item) throw new Error(`No story provenance metadata for registry item "${registryItem}"`);

  const isOriginal = !item.upstreamUrl;
  const catalogSourceUrl = item.upstreamUrl ?? item.inspirationUrl;
  const renderedSourceUrl = sourceUrl ?? catalogSourceUrl;
  const renderedLabel = provenanceLabel ?? item.provenanceLabel;
  const renderedRepositoryUrl = repositoryUrl ?? upstreamRepository;
  const renderedFoglampWebsite = foglampWebsite ?? 'https://foglamp.dev';
  const renderedCreatorWebsite = creatorWebsite ?? 'https://gustavofior.com';
  if (renderedLabel !== item.provenanceLabel || renderedSourceUrl !== catalogSourceUrl || renderedRepositoryUrl !== upstreamRepository || renderedFoglampWebsite !== 'https://foglamp.dev' || renderedCreatorWebsite !== 'https://gustavofior.com' || (isOriginal && notUpstream !== 'This is not an upstream Foglamp source file.') || (!isOriginal && notUpstream !== undefined) || !renderedSourceUrl || !renderedSourceUrl.includes(`/blob/${pinnedCommit}/`)) {
    throw new Error(`Story provenance metadata for "${registryItem}" has no pinned source URL`);
  }

  return (
    <aside className="not-prose my-6 rounded-lg border bg-card p-4 text-sm text-card-foreground shadow-(--custom-shadow)" aria-label="Component provenance">
      <p className="font-medium">Provenance: <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{renderedLabel}</span></p>
      <p className="mt-2 text-muted-foreground">
        {isOriginal ? 'This is not an upstream Foglamp source file. It is a new Tailrocks composition inspired by ' : 'Extracted from the exact upstream file '}
        <a className="underline underline-offset-4" href={renderedSourceUrl} target="_blank" rel="noreferrer noopener">
          {isOriginal ? 'this pinned Foglamp inspiration file' : renderedSourceUrl.split('/').pop()}
        </a>.
      </p>
      <p className="mt-2 text-muted-foreground">
        Upstream: <a className="underline underline-offset-4" href={renderedRepositoryUrl} target="_blank" rel="noreferrer noopener">github.com/foglamp-labs/foglamp</a>
        {' · '}<a className="underline underline-offset-4" href={renderedFoglampWebsite} target="_blank" rel="noreferrer noopener">foglamp.dev</a>
        {' · '}Original design by <a className="underline underline-offset-4" href={renderedCreatorWebsite} target="_blank" rel="noreferrer noopener">Gustavo Fior (@gustavo-fior)</a>
      </p>
    </aside>
  );
}
