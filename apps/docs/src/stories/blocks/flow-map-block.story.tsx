/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FlowMap } from '@tailrocks/framerock/blocks/scan/flow-map';
import { ScanFaviconProvider } from '@tailrocks/framerock/blocks/scan/favicon-context';
import type { NodeKind } from '@tailrocks/framerock/lib/scan/scan';
import { defineStory } from '../../lib/story';
import { scanFixture, resolveStoryFavicon } from './fixtures';
function FlowMapStory({ direction = 'RIGHT' }: { direction?: 'RIGHT' | 'DOWN' }) {
  return (
    <ScanFaviconProvider resolve={resolveStoryFavicon}>
      <div className="relative h-[640px] w-full overflow-hidden rounded-xl border border-border/60 bg-background">
        <FlowMap
          graph={scanFixture.graph}
          focusKinds={null as NodeKind[] | null}
          direction={direction}
          padding={{ left: 48, right: 48 }}
        />
      </div>
    </ScanFaviconProvider>
  );
}
export const story = defineStory({
  id: 'blocks/flow-map-block',
  displayName: 'Flow Map',
  registryItem: 'block-scan-flow-map',
  Component: FlowMapStory,
  frame: { width: 1280, height: 800 },
  args: [
    { variant: 'Horizontal flow', initial: { direction: 'RIGHT' } },
    { variant: 'Vertical flow', initial: { direction: 'DOWN' } },
  ],
});
