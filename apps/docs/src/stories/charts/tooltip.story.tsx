/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilLineChart, Line, Grid, Tooltip, XAxis, YAxis } from '@foglamp/design-system/charts/evilcharts/charts/line-chart';
import type { TooltipRoundness, TooltipVariant } from '@foglamp/design-system/charts/evilcharts/ui/tooltip';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type TooltipStoryProps = { variant: TooltipVariant; roundness: TooltipRoundness };
function TooltipStory({ variant, roundness }: TooltipStoryProps) {
	return <StorySurface><EvilLineChart config={observabilityConfig} data={observabilityData} className="h-[300px]" animationType="none" defaultSelectedDataKey="requests"><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip variant={variant} roundness={roundness} defaultIndex={6} valueFormatter={(value) => `${value} units`} /><Line dataKey="requests" isClickable /><Line dataKey="errors" isClickable /><Line dataKey="latency" isClickable /></EvilLineChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/tooltip', Component: TooltipStory, displayName: 'Chart Tooltip', registryItem: 'chart-evilcharts-ui-tooltip',
	args: { initial: { variant: 'frosted-glass', roundness: 'lg' } },
});
