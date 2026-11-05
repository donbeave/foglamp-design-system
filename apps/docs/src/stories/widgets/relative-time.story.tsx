/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { RelativeTime } from '@tailrocks/framerock/widgets/leaf/relative-time';
import { defineStory } from '../../lib/story';
function RelativeTimePreview({ value = '2025-02-14T10:00:00.000Z' }: { value?: string | null }) { return <span className="text-sm"><RelativeTime value={value}/></span>; }
export const story = defineStory({ id: 'widgets/relative-time', displayName: 'RelativeTime', registryItem: 'widget-leaf-relative-time', Component: RelativeTimePreview, args: [{ variant: 'Recent event', initial: { value: '2025-02-14T10:00:00.000Z' } }, { variant: 'No timestamp', initial: { value: null } }] });
