/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Hero3DDemoBlock } from '@foglamp/design-system/blocks/marketing/hero';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/hero-3d-demo-block', displayName: 'Hero 3D Demo', registryItem: 'block-marketing-hero-hero', Component: Hero3DDemoBlock, args: { initial: {} }, frame: { width: 1280, height: 800 } });
