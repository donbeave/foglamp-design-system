/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ModelLogo } from '@tailrocks/framerock/icons/model-logo';
import { defineStory } from '../../lib/story';
function ModelLogoPreview({ modelId = 'gpt-4o', provider = 'openai' }: { modelId?: string; provider?: string }) { return <div className="flex items-center gap-3"><ModelLogo modelId={modelId} provider={provider} className="size-7"/><span className="text-sm">{modelId}</span></div>; }
export const story = defineStory({ id: 'widgets/model-logo', displayName: 'ModelLogo', registryItem: 'icon-model-logo', Component: ModelLogoPreview, args: [{ variant: 'OpenAI', initial: { modelId: 'gpt-4o', provider: 'openai' } }, { variant: 'Anthropic', initial: { modelId: 'claude-3-7-sonnet', provider: 'anthropic' } }, { variant: 'Google', initial: { modelId: 'gemini-2.5-pro', provider: 'google' } }] });
