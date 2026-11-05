/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { SessionConversationInspectorBlock } from '@tailrocks/framerock/blocks/dashboard/session-conversation-inspector-block';
import { defineStory } from '../../lib/story';
import { DashboardStoryShell } from './fixtures';
function SessionConversationStory({ sessionId, isLoading }: { sessionId: string; isLoading: boolean }) { return <DashboardStoryShell><SessionConversationInspectorBlock sessionId={sessionId} isLoading={isLoading} /></DashboardStoryShell>; }
export const story = defineStory({ id: 'blocks/session-conversation-inspector-block', displayName: 'Session Conversation Inspector', registryItem: 'block-dashboard-session-conversation-inspector', Component: SessionConversationStory, args: { initial: { sessionId: 'ses_a91f', isLoading: false } } });
