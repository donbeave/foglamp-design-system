/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PayloadView } from '@tailrocks/framerock/widgets/payload-view';
import { defineStory } from '../../lib/story';

const messages = [
  { role: 'system', content: 'You are a support assistant. Never ask for or repeat secret credentials.' },
  { role: 'user', content: 'I cannot access our workspace after rotating an API key.' },
  { role: 'assistant', content: 'I can help you restore access. First, confirm that the replacement key is present in the deployment environment.' },
  { role: 'user', content: 'The new key is deployed, but the dashboard still shows the old session.' },
  { role: 'assistant', content: 'Sign out of the dashboard, sign in again, and verify the workspace selected in the project switcher. Existing sessions can remain active until they are refreshed.' },
  { role: 'user', content: 'Should I revoke the old key now? We have two production workers.' },
  { role: 'assistant', content: 'Check that both workers report successful requests with the replacement key. Once they do, revoke the old key and review the audit log for any requests that still use it.' },
];
const previousMessages = messages.slice(0, 5);
const conversation = JSON.stringify(messages);
const previousConversation = JSON.stringify(previousMessages);

function PayloadViewPreview({ foldBeforeLastUser = false, showPreviousCall = false }: { foldBeforeLastUser?: boolean; showPreviousCall?: boolean }) {
  return (
    <div className="w-full max-w-xl rounded-lg border bg-card p-4">
      <PayloadView value={conversation} previousValue={showPreviousCall ? previousConversation : undefined} foldBeforeLastUser={foldBeforeLastUser} />
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/payload-view',
  displayName: 'PayloadView',
  registryItem: 'widget-payload-view',
  Component: PayloadViewPreview,
  frame: { height: 520 },
  args: [
    { variant: 'Full conversation', initial: { foldBeforeLastUser: false, showPreviousCall: false } },
    { variant: 'Fold older turns', initial: { foldBeforeLastUser: true, showPreviousCall: false } },
    { variant: 'Show unchanged history from previous call', initial: { foldBeforeLastUser: false, showPreviousCall: true } },
  ],
});
