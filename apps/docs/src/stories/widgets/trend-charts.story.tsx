/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { ChartLegend, themed } from '@foglamp/design-system/widgets/trend-charts';
import { RangeStoryFrame } from './fixtures';
import { defineStory } from '../../lib/story';
const config = { input: { label: 'Input', colors: themed('#f97316') }, output: { label: 'Output', colors: themed('#0090fd') }, errors: { label: 'Errors', colors: themed('#ef4444') } };
function TrendChartsPreview() { const [selected, setSelected] = useState<string | null>(null); return <RangeStoryFrame><div className="rounded-xl border bg-card p-4"><div className="mb-4 text-sm font-medium">Activity over time</div><ChartLegend config={config} selected={selected} onSelect={setSelected}/><div className="mt-5 grid h-24 grid-cols-12 items-end gap-2">{[35, 52, 42, 74, 58, 82, 61, 92, 68, 77, 49, 88].map((height, i) => <span key={i} className="rounded-t bg-primary/70" style={{ height: `${height}%` }}/>)}</div></div></RangeStoryFrame>; }
export const story = defineStory({ id: 'widgets/trend-charts', displayName: 'TrendCharts', registryItem: 'widget-trend-charts', Component: TrendChartsPreview, args: [{ variant: 'Legend selection', initial: {} }] });
