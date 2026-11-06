/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PromptProseView } from '@tailrocks/framerock/widgets/prompt-prose';
import { SLOT_LINE } from '@tailrocks/framerock/lib/prompts/infer';
import { slotValues } from '@tailrocks/framerock/lib/prompts/slots';
import { defineStory } from '../../lib/story';

const template = [
  '## Support assistant',
  '',
  'Answer clearly and use the workspace context before suggesting a fix.',
  SLOT_LINE,
  '## Response policy',
  '',
  'Never ask for or repeat secret credentials.',
  SLOT_LINE,
].join('\n');
const filledPrompt = [
  '## Support assistant',
  '',
  'Answer clearly and use the workspace context before suggesting a fix.',
  'Jordan is locked out after rotating an API key. Two production workers need the replacement key.',
  '## Response policy',
  '',
  'Never ask for or repeat secret credentials.',
  'Confirm both workers use the replacement key before revoking the old one.',
].join('\n');
const actualSlotValues = slotValues(template, filledPrompt);
const slots = {
  slots: actualSlotValues.map((value, index) => ({
    examples: value === null ? [] : [{ value, runs: index === 0 ? 18 : 12 }],
  })),
};

function PromptProsePreview({ loading = false, label = 'Customer support prompt' }: { loading?: boolean; label?: string }) {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-4">
      {label ? <div className="mb-3 border-b border-border/60 pb-2 text-xs font-medium text-muted-foreground">{label}</div> : null}
      <PromptProseView template={template} slots={slots} loading={loading} />
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/prompt-prose',
  displayName: 'PromptProse',
  registryItem: 'widget-prompt-prose',
  Component: PromptProsePreview,
  frame: { height: 420 },
  args: [
    { variant: 'Rendered slots with run examples', initial: { loading: false, label: 'Customer support prompt' } },
    { variant: 'Loading slot examples', initial: { loading: true, label: 'Customer support prompt' } },
  ],
});
