/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ToolIcon } from '@tailrocks/framerock/widgets/leaf/tool-icon';
import { defineStory } from '../../lib/story';
function ToolIconPreview({ name = 'search_customers' }: { name?: string }) { return <div className="flex items-center gap-2"><ToolIcon name={name} className="size-4"/><code className="text-xs">{name}</code></div>; }
export const story = defineStory({ id: 'widgets/tool-icon', displayName: 'ToolIcon', registryItem: 'widget-leaf-tool-icon', Component: ToolIconPreview, args: [{ variant: 'Search', initial: { name: 'search_customers' } }, { variant: 'Unknown tool fallback', initial: { name: 'custom_internal_tool' } }] });
