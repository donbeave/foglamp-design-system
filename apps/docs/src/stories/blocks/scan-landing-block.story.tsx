/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ScanLanding } from '@tailrocks/framerock/blocks/scan/scan-landing';
import { ScanFaviconProvider } from '@tailrocks/framerock/blocks/scan/favicon-context';
import { defineStory } from '../../lib/story';
import { resolveStoryFavicon } from './fixtures';
function ScanLandingStory({ tryFoglampHref }: { tryFoglampHref: string }) { return <ScanFaviconProvider resolve={resolveStoryFavicon}><div className="w-full"><ScanLanding tryFoglampHref={tryFoglampHref} onCopy={() => {}} /></div></ScanFaviconProvider>; }
export const story = defineStory({ id: 'blocks/scan-landing-block', displayName: 'Scan Landing', registryItem: 'block-scan-scan-landing', Component: ScanLandingStory, frame: { width: 1280, height: 800 }, args: { initial: { tryFoglampHref: '#scan-demo' } } });
