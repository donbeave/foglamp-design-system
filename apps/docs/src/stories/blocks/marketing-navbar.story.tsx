/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { MarketingNavbar } from '@tailrocks/framerock/blocks/marketing/chrome/navbar';
import { defineStory } from '../../lib/story';
function MarketingNavbarStory({ compact }: { compact: boolean }) { return <div className={`w-full ${compact ? 'min-h-[120px]' : 'min-h-[240px]'}`}><MarketingNavbar brandName="Framerock" /></div>; }
export const story = defineStory({ id: 'blocks/marketing-navbar', displayName: 'Marketing Navbar', registryItem: 'block-marketing-chrome-navbar', Component: MarketingNavbarStory, frame: { width: 1280, height: 360 }, args: { initial: { compact: false } } });
