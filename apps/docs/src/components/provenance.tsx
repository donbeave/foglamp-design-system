import framerockRegistry from '../../../../packages/registry/registry.json';

const pinnedCommit = '7d7e6609108019a74902858d4b07c24825c6318b';
const upstreamRepository = 'https://github.com/foglamp-labs/foglamp';
const catalogItems = framerockRegistry.items as Array<{
  name: string;
  provenanceLabel: string;
  upstreamUrl?: string | null;
  inspirationUrl?: string | null;
}>;
const itemsByRegistryId = new Map(catalogItems.map((item) => [item.name, item]));

export function StoryProvenance({ registryItem, provenanceLabel, sourceUrl, repositoryUrl, foglampWebsite, creatorWebsite, notUpstream }: { registryItem: string; provenanceLabel?: string; sourceUrl?: string; repositoryUrl?: string; foglampWebsite?: string; creatorWebsite?: string; notUpstream?: string }) {
  const item = itemsByRegistryId.get(registryItem);
  if (!item) throw new Error(`No story provenance metadata for registry item "${registryItem}"`);

  const isOriginal = !item.upstreamUrl;
  const catalogSourceUrl = item.upstreamUrl ?? item.inspirationUrl ?? undefined;
  const renderedSourceUrl = sourceUrl ?? catalogSourceUrl;
  const renderedLabel = provenanceLabel ?? item.provenanceLabel;
  const renderedRepositoryUrl = repositoryUrl ?? upstreamRepository;
  const renderedFoglampWebsite = foglampWebsite ?? 'https://foglamp.dev';
  const renderedCreatorWebsite = creatorWebsite ?? 'https://gustavofior.com';
  if (
    renderedLabel !== item.provenanceLabel ||
    renderedSourceUrl !== catalogSourceUrl ||
    renderedRepositoryUrl !== upstreamRepository ||
    renderedFoglampWebsite !== 'https://foglamp.dev' ||
    renderedCreatorWebsite !== 'https://gustavofior.com' ||
    (isOriginal && notUpstream !== undefined && notUpstream !== 'This is not an upstream Foglamp source file.') ||
    (!isOriginal && notUpstream !== undefined) ||
    (!isOriginal && (!renderedSourceUrl || !renderedSourceUrl.includes(`/blob/${pinnedCommit}/`))) ||
    (isOriginal && renderedSourceUrl && !renderedSourceUrl.includes(`/blob/${pinnedCommit}/`))
  ) {
    throw new Error(`Story provenance metadata for "${registryItem}" has no pinned source URL`);
  }

  return (
    <aside className="not-prose flex flex-wrap items-center justify-between gap-2 border-t border-border/60 bg-muted/15 px-3.5 py-2 text-xs text-muted-foreground" aria-label="Component provenance">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{renderedLabel}</span>
        <span>
          {renderedSourceUrl ? (
            <>
              {isOriginal ? 'Inspired by ' : 'Source: '}
              <a className="font-mono underline underline-offset-4 hover:text-foreground" href={renderedSourceUrl} target="_blank" rel="noreferrer noopener">
                {renderedSourceUrl.split('/').pop()}
              </a>
            </>
          ) : (
            'Tailrocks original utility — not from upstream Foglamp'
          )}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <span>Original design by <a className="underline underline-offset-4 hover:text-foreground" href={renderedCreatorWebsite} target="_blank" rel="noreferrer noopener">Gustavo Fior (@gustavo-fior)</a></span>
        <span>·</span>
        <a className="underline underline-offset-4 hover:text-foreground" href="https://www.linkedin.com/in/abdulhdr/" target="_blank" rel="noreferrer noopener">Abdul Haidar</a>
        <span>·</span>
        <a className="underline underline-offset-4 hover:text-foreground" href={renderedRepositoryUrl} target="_blank" rel="noreferrer noopener">Foglamp Labs (foglamp-labs/foglamp)</a>
        <span>·</span>
        <a className="underline underline-offset-4 hover:text-foreground" href={renderedFoglampWebsite} target="_blank" rel="noreferrer noopener">foglamp.dev</a>
      </div>
    </aside>
  );
}
