/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ModelChip } from '@tailrocks/framerock/widgets/model-chip';
import { defineStory } from '../../lib/story';
function ModelChipPreview({ multi = false }: { multi?: boolean }) { const models = [{ modelId: 'gpt-4o', provider: 'openai' }, ...(multi ? [{ modelId: 'claude-3-7-sonnet', provider: 'anthropic' }, { modelId: 'gemini-2.5-pro', provider: 'google' }] : [])]; return <ModelChip models={models}/>; }
export const story = defineStory({ id: 'widgets/model-chip', displayName: 'ModelChip', registryItem: 'widget-model-chip', Component: ModelChipPreview, args: [{ variant: 'Single model', initial: { multi: false } }, { variant: 'Multiple models', initial: { multi: true } }] });
