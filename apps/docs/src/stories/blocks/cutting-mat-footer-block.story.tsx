/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { CuttingMatFooterBlock } from '@tailrocks/framerock/blocks/marketing/chrome/footer';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/cutting-mat-footer-block', displayName: 'Cutting Mat Footer', registryItem: 'block-marketing-chrome-footer', Component: CuttingMatFooterBlock, args: { initial: {} }, frame: { width: 1280, height: 800 } });
