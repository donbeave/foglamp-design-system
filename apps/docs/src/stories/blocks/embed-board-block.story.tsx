/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EmbedBoard } from '@tailrocks/framerock/blocks/scan/embed-board';
import { ScanFaviconProvider } from '@tailrocks/framerock/blocks/scan/favicon-context';
import { defineStory } from '../../lib/story';
import { scanFixture, resolveStoryFavicon } from './fixtures';
function EmbedBoardStory({ slug }: { slug: string }) { return <ScanFaviconProvider resolve={resolveStoryFavicon}><div className="h-[720px] overflow-hidden"><EmbedBoard data={scanFixture} slug={slug} /></div></ScanFaviconProvider>; }
export const story = defineStory({ id: 'blocks/embed-board-block', displayName: 'Embedded Scan Board', registryItem: 'block-scan-embed-board', Component: EmbedBoardStory, args: { initial: { slug: 'foglamp' } }, frame: { width: 1280, height: 800 } });
