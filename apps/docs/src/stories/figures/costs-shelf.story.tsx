/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@foglamp/design-system/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsShelfFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="shelf" /></div>; }

export const story = defineStory({ id: 'figures/costs-shelf', displayName: 'Costs Shelf', registryItem: 'figure-costs-shelf', Component: CostsShelfFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
