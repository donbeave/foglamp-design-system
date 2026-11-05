/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsFanFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="fan" /></div>; }

export const story = defineStory({ id: 'figures/costs-fan', displayName: 'Costs Fan', registryItem: 'figure-costs-fan', Component: CostsFanFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
