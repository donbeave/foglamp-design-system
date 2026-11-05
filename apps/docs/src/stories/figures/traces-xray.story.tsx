/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@foglamp/design-system/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function TracesXrayFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="traces" variantId="xray" /></div>; }

export const story = defineStory({ id: 'figures/traces-xray', displayName: 'Traces Xray', registryItem: 'figure-traces-xray', Component: TracesXrayFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
