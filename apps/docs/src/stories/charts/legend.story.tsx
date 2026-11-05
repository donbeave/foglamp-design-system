/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilLineChart, Line, Grid, Legend, Tooltip, XAxis, YAxis } from '@foglamp/design-system/charts/evilcharts/charts/line-chart';
import type { ChartLegendVariant } from '@foglamp/design-system/charts/evilcharts/ui/legend';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type LegendStoryProps = { variant: ChartLegendVariant; isClickable: boolean };
function LegendStory({ variant, isClickable }: LegendStoryProps) {
	return <StorySurface><EvilLineChart config={observabilityConfig} data={observabilityData} className="h-[300px]" animationType="none"><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip /><Legend align="left" variant={variant} isClickable={isClickable} /><Line dataKey="requests" isClickable /><Line dataKey="errors" isClickable /><Line dataKey="latency" isClickable /></EvilLineChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/legend', Component: LegendStory, displayName: 'Chart Legend', registryItem: 'chart-evilcharts-ui-legend',
	args: { initial: { variant: 'rounded-square', isClickable: true } },
});
