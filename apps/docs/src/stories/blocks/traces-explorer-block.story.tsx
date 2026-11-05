/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { TracesExplorerBlock } from '@foglamp/design-system/blocks/dashboard/traces-explorer-block';
import { TraceWaterfallInspectorBlock } from '@foglamp/design-system/blocks/dashboard/trace-waterfall-inspector-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function TracesExplorerStory({ isLoading, isFetching }: { isLoading: boolean; isFetching: boolean }) { const [traceId, setTraceId] = useState<string | null>(null); return <DashboardStoryShell>{traceId ? <div><button type="button" className="mb-3 text-sm text-muted-foreground hover:text-foreground" onClick={() => setTraceId(null)}>← Back to traces</button><TraceWaterfallInspectorBlock traceId={traceId} /></div> : <TracesExplorerBlock isLoading={isLoading} isFetching={isFetching} onTraceSelect={setTraceId} onFiltersChange={() => {}} />}</DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/traces-explorer-block', displayName: 'Traces Explorer', registryItem: 'block-dashboard-traces-explorer', Component: TracesExplorerStory, args: { initial: { isLoading: false, isFetching: false } } });
