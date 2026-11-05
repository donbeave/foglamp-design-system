/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { EvilLineChart, Line, Grid, Tooltip, XAxis, YAxis } from '@foglamp/design-system/charts/evilcharts/charts/line-chart';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type ZoomStoryProps = { showBrush: boolean };
function ZoomStory({ showBrush }: ZoomStoryProps) {
	const [range, setRange] = useState<string | null>(null);
	return <StorySurface><div className="mb-2 flex min-h-6 items-center justify-between text-xs text-muted-foreground"><span>Drag across plot buckets to zoom · double-click to reset</span><span aria-live="polite">{range ?? 'Full reporting window'}</span></div><EvilLineChart config={observabilityConfig} data={observabilityData} className="h-[300px]" animationType="none" curveType="monotone" xDataKey="day" showBrush={showBrush} onZoomSelect={(start, end) => setRange(`${start} → ${end}`)} onZoomReset={() => setRange(null)}><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip /><Line dataKey="requests" /><Line dataKey="errors" /></EvilLineChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/zoom', Component: ZoomStory, displayName: 'Drag-to-Zoom Selection', registryItem: 'chart-evilcharts-ui-zoom',
	args: { initial: { showBrush: true } },
});
