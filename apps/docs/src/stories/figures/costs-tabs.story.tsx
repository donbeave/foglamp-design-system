/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsTabsFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="tabs" /></div>; }

export const story = defineStory({ id: 'figures/costs-tabs', displayName: 'Costs Tabs', registryItem: 'figure-costs-tabs', Component: CostsTabsFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
