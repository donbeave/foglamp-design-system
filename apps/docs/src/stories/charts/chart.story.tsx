/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilAreaChart, Area, Grid, Tooltip, XAxis, YAxis } from '@foglamp/design-system/charts/evilcharts/charts/area-chart';
import { ChartBackground } from '@foglamp/design-system/charts/evilcharts/ui/background';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';
type ChartStoryProps = { isUpdating: boolean; backgroundVariant: 'dots' | 'grid' | 'cross-hatch' };
function ChartStory({ isUpdating, backgroundVariant }: ChartStoryProps) {
	return <StorySurface><EvilAreaChart config={observabilityConfig} data={observabilityData} className="h-[300px]" isUpdating={isUpdating} animationType="none"><ChartBackground variant={backgroundVariant} /><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip variant="frosted-glass" /><Area dataKey="requests" variant="gradient" /></EvilAreaChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/chart', Component: ChartStory, displayName: 'Chart Container & Context', registryItem: 'chart-evilcharts-ui-chart',
	args: { initial: { backgroundVariant: 'dots', isUpdating: false } },
});
