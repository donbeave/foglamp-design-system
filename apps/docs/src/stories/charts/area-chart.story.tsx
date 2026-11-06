/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilAreaChart, Area, Dot, Grid, Legend, Tooltip, XAxis, YAxis } from '@tailrocks/framerock/charts/evilcharts/charts/area-chart';
import { ChartBackground } from '@tailrocks/framerock/charts/evilcharts/ui/background';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type AreaStoryProps = { variant: 'gradient' | 'hatched' | 'solid'; isLoading: boolean };
function AreaStory({ variant, isLoading }: AreaStoryProps) {
	return <StorySurface><EvilAreaChart config={observabilityConfig} data={observabilityData} className="h-[300px]" isLoading={isLoading} curveType="monotone" animationType="left-to-right"><ChartBackground variant="dots" /><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip variant="frosted-glass" /><Legend align="left" isClickable /><Area dataKey="requests" variant={variant} isClickable><Dot variant="border" /></Area><Area dataKey="errors" variant="gradient" isClickable /></EvilAreaChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/area-chart', Component: AreaStory, displayName: 'Evil Area Chart',
	registryItem: 'chart-evilcharts-charts-area-chart',
	frame: { width: 960, height: 440 },
	args: { initial: { variant: 'gradient', isLoading: false } },
});
