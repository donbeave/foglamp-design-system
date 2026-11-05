/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ScanBoard } from '@tailrocks/framerock/blocks/scan/scan-board';
import { ScanFaviconProvider } from '@tailrocks/framerock/blocks/scan/favicon-context';
import { defineStory } from '../../lib/story';
import { scanFixture, resolveStoryFavicon } from './fixtures';
function ScanBoardStory() { return <ScanFaviconProvider resolve={resolveStoryFavicon}><ScanBoard data={scanFixture} /></ScanFaviconProvider>; }
export const story = defineStory({ id: 'blocks/scan-board-block', displayName: 'Scan Board', registryItem: 'block-scan-scan-board', Component: ScanBoardStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
