/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { CopyButton } from '@tailrocks/framerock/widgets/leaf/copy-button';
import { defineStory } from '../../lib/story';
function CopyButtonPreview({ value = 'sk_live_framerock_demo_42' }: { value?: string }) { return <div className="flex items-center gap-2"><code className="text-xs">{value}</code><CopyButton value={value} title="Copy demo API key"/></div>; }
export const story = defineStory({ id: 'widgets/copy-button', displayName: 'CopyButton', registryItem: 'widget-leaf-copy-button', Component: CopyButtonPreview, args: [{ variant: 'API key', initial: { value: 'sk_live_framerock_demo_42' } }] });
