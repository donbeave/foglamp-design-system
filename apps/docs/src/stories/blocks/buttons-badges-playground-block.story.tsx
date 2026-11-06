/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ButtonsBadgesPlaygroundBlock } from '@tailrocks/framerock/blocks/auth/buttons-badges';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/buttons-badges-playground-block', displayName: 'Buttons & Badges Playground', registryItem: 'block-auth-buttons-badges', Component: ButtonsBadgesPlaygroundBlock, frame: { width: 1280, height: 760 }, args: { initial: {} } });
