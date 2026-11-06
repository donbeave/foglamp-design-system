/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { TraceWaterfallInspectorBlock } from '@tailrocks/framerock/blocks/dashboard/trace-waterfall-inspector-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function TraceWaterfallStory({ isLoading }: { isLoading: boolean }) { const [span, setSpan] = useState<string | null>(null); return <DashboardStoryShell><TraceWaterfallInspectorBlock isLoading={isLoading} initialSpanId={span ?? undefined} onSpanChange={setSpan} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/trace-waterfall-inspector-block', displayName: 'Trace Waterfall Inspector', registryItem: 'block-dashboard-trace-waterfall-inspector', Component: TraceWaterfallStory, frame: { width: 1280, height: 800 }, args: { initial: { isLoading: false } } });
