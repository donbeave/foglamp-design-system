/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { EvalDetailBlock } from '@tailrocks/framerock/blocks/dashboard/eval-detail-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function EvalDetailStory({ evalId, isLoading }: { evalId: string; isLoading: boolean }) { return <DashboardStoryShell><EvalDetailBlock evalId={evalId} isLoading={isLoading} onUpdate={async () => {}} onQueryChange={() => {}} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/eval-detail-block', displayName: 'Eval Detail', registryItem: 'block-dashboard-eval-detail', Component: EvalDetailStory, frame: { width: 1280, height: 800 }, args: { initial: { evalId: 'eval-support-quality', isLoading: false } } });
