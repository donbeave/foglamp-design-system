/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { SpanTypeBadge, SpanTypeChip } from '@foglamp/design-system/widgets/leaf/span-type';
import { defineStory } from '../../lib/story';
function SpanTypePreview({ type = 'llm' }: { type?: string }) { return <div className="flex items-center gap-3"><SpanTypeChip type={type}/><SpanTypeBadge type={type}/></div>; }
export const story = defineStory({ id: 'widgets/span-type', displayName: 'SpanType', registryItem: 'widget-leaf-span-type', Component: SpanTypePreview, args: [{ variant: 'Model call', initial: { type: 'llm' } }, { variant: 'Tool', initial: { type: 'tool' } }, { variant: 'Agent', initial: { type: 'agent' } }, { variant: 'Embedding', initial: { type: 'embedding' } }] });
