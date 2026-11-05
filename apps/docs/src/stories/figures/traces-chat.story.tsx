/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FigureVariant } from '@foglamp/design-system/blocks/marketing/figures/figure-picker';
import { defineStory } from '../../lib/story';

// The variant component stays source-lazy; FigureVariant provides the source reveal and Suspense fallback.
function TracesChatFigureStory() { return <div className="mx-auto w-full max-w-5xl p-6"><FigureVariant section="traces" variantId="chat" /></div>; }

export const story = defineStory({ id: 'figures/traces-chat', displayName: 'Traces Chat', registryItem: 'figure-traces-chat', Component: TracesChatFigureStory, args: { initial: {} }, frame: { width: 1280, height: 800 } });
