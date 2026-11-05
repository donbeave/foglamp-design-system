/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { MarketingNavbar } from '@foglamp/design-system/blocks/marketing/chrome/navbar';
import { defineStory } from '../../lib/story';
function MarketingNavbarStory({ compact }: { compact: boolean }) { return <div className={compact ? 'min-h-[120px]' : 'min-h-[240px]'}><MarketingNavbar /></div>; }
export const story = defineStory({ id: 'blocks/marketing-navbar', displayName: 'Marketing Navbar', registryItem: 'block-marketing-chrome-navbar', Component: MarketingNavbarStory, args: { initial: { compact: false } } });
