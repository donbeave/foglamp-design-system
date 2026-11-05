/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsSharesFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="shares" /></div>; }

export const story = defineStory({ id: 'figures/costs-shares', displayName: 'Costs Shares', registryItem: 'figure-costs-shares', Component: CostsSharesFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
