/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { HudSimulatorBlock } from '@foglamp/design-system/blocks/marketing/hud-landing';
import { defineStory } from '../../lib/story';
export const story = defineStory({ id: 'blocks/hud-simulator-block', displayName: 'HUD Simulator', registryItem: 'block-marketing-hud-landing', Component: HudSimulatorBlock, args: { initial: { homeHref: '#local-demo' } }, frame: { width: 1280, height: 800 } });
