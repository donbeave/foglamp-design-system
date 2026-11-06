/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilLineChart, Dot, Line, Grid, Legend, Tooltip, XAxis, YAxis } from '@tailrocks/framerock/charts/evilcharts/charts/line-chart';
import { ChartBackground } from '@tailrocks/framerock/charts/evilcharts/ui/background';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type LineStoryProps = { strokeVariant: 'solid' | 'dashed' | 'animated-dashed'; isLoading: boolean };
function LineStory({ strokeVariant, isLoading }: LineStoryProps) {
	return <StorySurface><EvilLineChart config={observabilityConfig} data={observabilityData} className="h-[300px]" isLoading={isLoading} animationType="left-to-right" curveType="monotone"><ChartBackground variant="cross-hatch" /><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip variant="frosted-glass" /><Legend align="left" isClickable /><Line dataKey="requests" strokeVariant={strokeVariant} glowing enableBufferLine isClickable><Dot variant="colored-border" /></Line><Line dataKey="errors" strokeVariant="dashed" isClickable /></EvilLineChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/line-chart', Component: LineStory, displayName: 'Evil Line Chart',
	registryItem: 'chart-evilcharts-charts-line-chart',
	frame: { width: 960, height: 440 },
	args: { initial: { strokeVariant: 'solid', isLoading: false } },
});
