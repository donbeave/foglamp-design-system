/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ContextChip } from '@foglamp/design-system/widgets/context-chip';
import { defineStory } from '../../lib/story';
function ChipMark({ className }: { className?: string }) { return <span className={className} aria-hidden="true">●</span>; }
function ContextChipPreview({ label = 'Support agent' }: { label?: string }) { return <div className="flex flex-wrap gap-2"><ContextChip icon={ChipMark} label={label}/><ContextChip icon={ChipMark} label="Last 7 days" href="/traces"/></div>; }
export const story = defineStory({ id: 'widgets/context-chip', displayName: 'ContextChip', registryItem: 'widget-context-chip', Component: ContextChipPreview, args: [{ variant: 'Agent context', initial: { label: 'Support agent' } }, { variant: 'Project context', initial: { label: 'Acme Production' } }] });
