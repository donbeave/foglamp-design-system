/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { OverviewDashboardBlock } from '@foglamp/design-system/blocks/dashboard/overview-dashboard-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function OverviewStory({ isUpdating }: { isUpdating: boolean }) { return <DashboardStoryShell><OverviewDashboardBlock isUpdating={isUpdating} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/overview-dashboard-block', displayName: 'Overview Dashboard', registryItem: 'block-dashboard-overview-dashboard', Component: OverviewStory, args: { initial: { isUpdating: false } } });
