/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@foglamp/design-system/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function CostsTableFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="costs" variantId="table" /></div>; }

export const story = defineStory({ id: 'figures/costs-table', displayName: 'Costs Table', registryItem: 'figure-costs-table', Component: CostsTableFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
