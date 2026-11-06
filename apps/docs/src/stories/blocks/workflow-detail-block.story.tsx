/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { WorkflowDetailBlock } from '@tailrocks/framerock/blocks/dashboard/workflow-detail-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function WorkflowDetailStory({ nameParam, isUpdating }: { nameParam: string; isUpdating: boolean }) { const [run, setRun] = useState<string | null>(null); return <DashboardStoryShell><WorkflowDetailBlock nameParam={nameParam} isUpdating={isUpdating} initialRun={run} onRunChange={setRun} onNavigate={() => {}} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/workflow-detail-block', displayName: 'Workflow Detail', registryItem: 'block-dashboard-workflow-detail', Component: WorkflowDetailStory, frame: { width: 1280, height: 800 }, args: { initial: { nameParam: 'Support', isUpdating: false } } });
