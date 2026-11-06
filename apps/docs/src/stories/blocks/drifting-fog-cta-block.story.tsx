/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { DriftingFogCtaBlock } from '@tailrocks/framerock/blocks/marketing/cta/cta';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/drifting-fog-cta-block', displayName: 'Drifting Fog CTA', registryItem: 'block-marketing-cta-cta', Component: DriftingFogCtaBlock, args: { initial: {} }, frame: { width: 1280, height: 900 } });
