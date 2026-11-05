/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FlowMap } from '@foglamp/design-system/blocks/scan/flow-map';
import { ScanFaviconProvider } from '@foglamp/design-system/blocks/scan/favicon-context';
import type { NodeKind } from '@foglamp/design-system/lib/scan/scan';
import { defineStory } from '../../lib/story';
import { scanFixture, resolveStoryFavicon } from './fixtures';
function FlowMapStory({ direction }: { direction: 'RIGHT' | 'DOWN' }) { return <ScanFaviconProvider resolve={resolveStoryFavicon}><div className="h-[720px] overflow-hidden rounded-lg"><FlowMap graph={scanFixture.graph} focusKinds={null as NodeKind[] | null} direction={direction} /></div></ScanFaviconProvider>; }
export const story = defineStory({ id: 'blocks/flow-map-block', displayName: 'Flow Map', registryItem: 'block-scan-flow-map', Component: FlowMapStory, args: { initial: { direction: 'RIGHT' } } });
