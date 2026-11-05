/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsStairFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="stair" /></div>; }

export const story = defineStory({ id: 'figures/costs-stair', displayName: 'Costs Stair', registryItem: 'figure-costs-stair', Component: CostsStairFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
