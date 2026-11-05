/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { AgentDetailInspectorBlock } from '@foglamp/design-system/blocks/dashboard/agent-detail-inspector-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function AgentDetailStory({ agentName, isUpdating }: { agentName: string; isUpdating: boolean }) { const [trace, setTrace] = useState<string | null>(null); return <DashboardStoryShell><AgentDetailInspectorBlock agentName={agentName} isUpdating={isUpdating} initialTrace={trace} onTraceChange={setTrace} onNavigate={() => {}} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/agent-detail-inspector-block', displayName: 'Agent Detail Inspector', registryItem: 'block-dashboard-agent-detail-inspector', Component: AgentDetailStory, args: { initial: { agentName: 'Support agent', isUpdating: false } } });
