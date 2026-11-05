/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PromptProseView } from '@foglamp/design-system/widgets/prompt-prose';
import { defineStory } from '../../lib/story';
const template = '## Support assistant\n\nAnswer clearly and use customer context.\n\nCustomer: {{customer_context}}\nPolicy: {{response_policy}}';
const slots = { slots: [{ examples: [{ value: 'Jordan is locked out after rotating an API key.', runs: 18 }] }, { examples: [{ value: 'Never request a secret key in chat.', runs: 18 }] }] };
function PromptProsePreview({ loading = false }: { loading?: boolean }) { return <div className="w-full max-w-lg rounded-xl border bg-card p-4"><PromptProseView template={template} slots={slots} loading={loading}/></div>; }
export const story = defineStory({ id: 'widgets/prompt-prose', displayName: 'PromptProse', registryItem: 'widget-prompt-prose', Component: PromptProsePreview, args: [{ variant: 'Rendered slots', initial: { loading: false } }, { variant: 'Loading', initial: { loading: true } }] });
