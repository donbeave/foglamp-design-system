/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ObservabilityGuideBlock } from '@tailrocks/framerock/blocks/guide/observability-guide';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/observability-guide-block', displayName: 'Observability Guide', registryItem: 'block-guide-observability-guide', Component: ObservabilityGuideBlock, args: { initial: {} }, frame: { width: 1280, height: 800 } });
