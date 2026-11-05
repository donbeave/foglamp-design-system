/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvilAreaChart, Area, Grid, Tooltip, XAxis, YAxis } from '@tailrocks/framerock/charts/evilcharts/charts/area-chart';
import type { BackgroundVariant } from '@tailrocks/framerock/charts/evilcharts/ui/background';
import { ChartBackground } from '@tailrocks/framerock/charts/evilcharts/ui/background';
import { defineStory } from '../../lib/story';
import { observabilityConfig, observabilityData, StorySurface } from './fixtures';

type BackgroundStoryProps = { variant: BackgroundVariant };
function BackgroundStory({ variant }: BackgroundStoryProps) {
	return <StorySurface><EvilAreaChart config={observabilityConfig} data={observabilityData} className="h-[300px]" animationType="none"><ChartBackground variant={variant} /><Grid /><XAxis dataKey="day" /><YAxis width={32} /><Tooltip /><Area dataKey="requests" variant="gradient" /></EvilAreaChart></StorySurface>;
}

export const story = defineStory({
	id: 'charts/background', Component: BackgroundStory, displayName: 'Chart SVG Background Patterns', registryItem: 'chart-evilcharts-ui-background',
	args: { initial: { variant: 'dots' } },
});
