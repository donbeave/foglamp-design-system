/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilDonutChart, type DonutSlice } from '@foglamp/design-system/charts/evilcharts/charts/donut-chart';
import { defineStory } from '../../lib/story';
import { StorySurface } from './fixtures';

const slices: DonutSlice[] = [
	{ key: 'requests', value: 42 }, { key: 'errors', value: 18 }, { key: 'latency', value: 27 },
];
const config = {
	requests: { label: 'Prompt runs', colors: { light: ['#6d5efc'], dark: ['#a59bff'] } },
	errors: { label: 'Evaluations', colors: { light: ['#e05d71'], dark: ['#ff8292'] } },
	latency: { label: 'Tool calls', colors: { light: ['#19a98c'], dark: ['#54d9b5'] } },
};

type DonutStoryProps = { showLegend: boolean; isLoading: boolean };
function DonutStory({ showLegend, isLoading }: DonutStoryProps) {
	return <StorySurface><div className="h-[300px]"><EvilDonutChart config={config} data={slices} className="h-full" centerLabel="87%" centerSubLabel="successful runs" showLegend={showLegend} legendVariant="circle" tooltipVariant="frosted-glass" isLoading={isLoading} valueFormatter={(value) => `${value}%`} /></div></StorySurface>;
}

export const story = defineStory({
	id: 'charts/donut-chart', Component: DonutStory, displayName: 'Evil Donut Chart',
	registryItem: 'chart-evilcharts-charts-donut-chart',
	args: { initial: { showLegend: true, isLoading: false } },
});
