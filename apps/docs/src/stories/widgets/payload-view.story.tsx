/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PayloadView } from '@foglamp/design-system/widgets/payload-view';
import { defineStory } from '../../lib/story';
const conversation = JSON.stringify([{ role: 'user', content: 'How do I rotate my production API key?' }, { role: 'assistant', content: 'Open Settings → API Keys, create a replacement, update your service, then revoke the old key.' }]);
function PayloadViewPreview({ foldBeforeLastUser = false }: { foldBeforeLastUser?: boolean }) { return <div className="w-full max-w-xl rounded-lg border bg-card p-4"><PayloadView value={conversation} foldBeforeLastUser={foldBeforeLastUser}/></div>; }
export const story = defineStory({ id: 'widgets/payload-view', displayName: 'PayloadView', registryItem: 'widget-payload-view', Component: PayloadViewPreview, args: [{ variant: 'Conversation payload', initial: { foldBeforeLastUser: false } }, { variant: 'Fold older turns', initial: { foldBeforeLastUser: true } }] });
