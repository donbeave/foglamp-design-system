/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function TracesGraphFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="traces" variantId="graph" /></div>; }

export const story = defineStory({ id: 'figures/traces-graph', displayName: 'Traces Graph', registryItem: 'figure-traces-graph', Component: TracesGraphFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
