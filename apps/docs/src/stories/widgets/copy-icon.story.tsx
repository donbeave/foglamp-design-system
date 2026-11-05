/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { CopyIcon } from '@foglamp/design-system/widgets/leaf/copy-icon';
import { defineStory } from '../../lib/story';
function CopyIconPreview({ copied = false }: { copied?: boolean }) { return <div className="flex items-center gap-4"><span className="flex items-center gap-2"><CopyIcon copied={false} className="size-4"/>Copy</span><span className="flex items-center gap-2"><CopyIcon copied={copied} className="size-4"/>{copied ? 'Copied' : 'Ready'}</span></div>; }
export const story = defineStory({ id: 'widgets/copy-icon', displayName: 'CopyIcon', registryItem: 'widget-leaf-copy-icon', Component: CopyIconPreview, args: [{ variant: 'Ready', initial: { copied: false } }, { variant: 'Copied', initial: { copied: true } }] });
