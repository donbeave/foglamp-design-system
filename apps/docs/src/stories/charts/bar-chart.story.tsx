/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilBarChart, Bar, Grid, Legend, Threshold, Tooltip, XAxis, YAxis } from '@tailrocks/framerock/charts/evilcharts/charts/bar-chart';
import { ChartBackground } from '@tailrocks/framerock/charts/evilcharts/ui/background';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type BarStoryProps = { layout: 'vertical' | 'horizontal'; stacked: boolean };
function BarStory({ layout, stacked }: BarStoryProps) {
	return <StorySurface><EvilBarChart config={observabilityConfig} data={observabilityData} className="h-[300px]" layout={layout} stackType={stacked ? 'stacked' : 'default'}><ChartBackground variant="grid" /><Grid /><XAxis dataKey={layout === 'vertical' ? 'day' : undefined} type={layout === 'horizontal' ? 'number' : 'category'} /><YAxis dataKey={layout === 'horizontal' ? 'day' : undefined} type={layout === 'horizontal' ? 'category' : 'number'} width={layout === 'horizontal' ? 52 : 36} /><Tooltip variant="frosted-glass" /><Legend align="left" isClickable /><Threshold value={200} label="request budget" /><Bar dataKey="requests" /><Bar dataKey="errors" /></EvilBarChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/bar-chart', Component: BarStory, displayName: 'Evil Bar Chart',
	registryItem: 'chart-evilcharts-charts-bar-chart',
	frame: { width: 960, height: 440 },
	args: { initial: { layout: 'vertical', stacked: false } },
});
