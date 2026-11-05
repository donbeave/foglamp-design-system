/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Stat } from '@tailrocks/framerock/widgets/leaf/stat';
import { defineStory } from '../../lib/story';
function StatPreview({ label = 'Runs', value = '1,284', emphasis = true }: { label?: string; value?: string; emphasis?: boolean }) { return <Stat label={label} value={value} emphasis={emphasis}/>; }
export const story = defineStory({ id: 'widgets/stat', displayName: 'Stat', registryItem: 'widget-leaf-stat', Component: StatPreview, args: [{ variant: 'Runs', initial: { label: 'Runs', value: '1,284', emphasis: true } }, { variant: 'Cost', initial: { label: 'Total cost', value: '$12.48', emphasis: false } }] });
