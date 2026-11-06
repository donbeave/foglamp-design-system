/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilLineChart, Dot, Line, Grid, Tooltip, XAxis, YAxis } from '@tailrocks/framerock/charts/evilcharts/charts/line-chart';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type DotStoryProps = { type: 'default' | 'border' | 'colored-border' };
function DotStory({ type }: DotStoryProps) {
	return <StorySurface><EvilLineChart config={observabilityConfig} data={observabilityData} className="h-[280px]" animationType="none" curveType="monotone"><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip /><Line dataKey="requests" strokeVariant="solid"><Dot variant={type} /></Line><Line dataKey="errors" strokeVariant="dashed"><Dot variant="border" /></Line></EvilLineChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/dot', Component: DotStory, displayName: 'Chart Dots', registryItem: 'chart-evilcharts-ui-dot',
	frame: { width: 960, height: 440 },
	args: { initial: { type: 'border' } },
});
