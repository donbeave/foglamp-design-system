/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { AgentIcon } from '@tailrocks/framerock/widgets/leaf/agent-icon';
import { defineStory } from '../../lib/story';
function AgentIconPreview({ name = 'Support Assistant', filled = true }: { name?: string; filled?: boolean }) { return <div className="flex items-center gap-3"><AgentIcon name={name} filled={filled} className="size-8"/><span>{name}</span></div>; }
export const story = defineStory({ id: 'widgets/agent-icon', displayName: 'AgentIcon', registryItem: 'widget-leaf-agent-icon', Component: AgentIconPreview, args: [{ variant: 'Filled', initial: { name: 'Support Assistant', filled: true } }, { variant: 'Outline', initial: { name: 'Research Agent', filled: false } }] });
