/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useEffect, useState } from 'react';
import { DevBarView, type DevNetworkDelay } from '@tailrocks/framerock/widgets/dev-toolbar';
import { defineStory } from '../../lib/story';

function DevBarPreview({ forceLoading: initialForceLoading = false, netFail: initialNetFail = false }: { forceLoading?: boolean; netFail?: boolean }) {
  const [netDelay, setNetDelay] = useState<DevNetworkDelay>(0);
  const [netFail, setNetFail] = useState(initialNetFail);
  const [forceLoading, setForceLoading] = useState(initialForceLoading);
  const [invalidatedCount, setInvalidatedCount] = useState(0);
  const [clearedCount, setClearedCount] = useState(0);
  const [queries, setQueries] = useState({
    fetching: [{ hash: 'q_83a1', label: 'traces.list' }],
    stale: [{ hash: 'q_829a', label: 'projects.active' }],
    staleInactive: 2,
  });

  useEffect(() => {
    setNetFail(initialNetFail);
  }, [initialNetFail]);

  useEffect(() => {
    setForceLoading(initialForceLoading);
  }, [initialForceLoading]);

  return (
    <div className="relative min-h-48 w-full max-w-xl">
      {invalidatedCount > 0 || clearedCount > 0 ? (
        <div className="mb-2 text-xs text-muted-foreground" role="status">
          {invalidatedCount > 0 ? `Invalidated queries (${invalidatedCount})` : ''}
          {invalidatedCount > 0 && clearedCount > 0 ? ' · ' : ''}
          {clearedCount > 0 ? `Cleared cache (${clearedCount})` : ''}
        </div>
      ) : null}
      <DevBarView
        fps={60}
        queries={queries}
        netDelay={netDelay}
        netFail={netFail}
        forceLoading={forceLoading}
        onNetworkDelayChange={setNetDelay}
        onNetworkFailChange={setNetFail}
        onForceLoadingChange={setForceLoading}
        onInvalidateQueries={() => {
          setInvalidatedCount((c) => c + 1);
          setQueries({
            fetching: [],
            stale: [],
            staleInactive: 0,
          });
          window.dispatchEvent(new Event('foglamp-story:invalidate'));
        }}
        onClearQueries={() => {
          setClearedCount((c) => c + 1);
          setQueries({
            fetching: [],
            stale: [],
            staleInactive: 0,
          });
          window.dispatchEvent(new Event('foglamp-story:clear'));
        }}
      />
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/dev-bar',
  displayName: 'DevBar',
  registryItem: 'widget-dev-toolbar',
  Component: DevBarPreview,
  frame: { height: 340 },
  args: [
    { variant: 'Query diagnostics', initial: { forceLoading: false, netFail: false } },
    { variant: 'Forced loading and failures', initial: { forceLoading: true, netFail: true } },
  ],
});
