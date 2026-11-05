/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PromptVersionChip } from '@tailrocks/framerock/widgets/prompt-version-chip';
import { defineStory } from '../../lib/story';
function PromptVersionChipPreview({ linked = true }: { linked?: boolean }) { return <PromptVersionChip version={{ id: 'v12', number: 12 }} agentName={linked ? 'Support Assistant' : null}/>; }
export const story = defineStory({ id: 'widgets/prompt-version-chip', displayName: 'PromptVersionChip', registryItem: 'widget-prompt-version-chip', Component: PromptVersionChipPreview, args: [{ variant: 'Linked to agent', initial: { linked: true } }, { variant: 'Standalone', initial: { linked: false } }] });
