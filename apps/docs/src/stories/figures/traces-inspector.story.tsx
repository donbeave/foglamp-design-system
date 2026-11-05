/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@tailrocks/framerock/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function TracesInspectorFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="traces" variantId="inspector" /></div>; }

export const story = defineStory({ id: 'figures/traces-inspector', displayName: 'Traces Inspector', registryItem: 'figure-traces-inspector', Component: TracesInspectorFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
