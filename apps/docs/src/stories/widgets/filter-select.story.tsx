/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FilterSelect } from '@foglamp/design-system/widgets/data-table';
import { defineStory } from '../../lib/story';
function FilterSelectPreview({ allLabel = 'Any status' }: { allLabel?: string }) { const [value, setValue] = useState<'completed' | 'running' | 'failed' | ''>('completed'); return <FilterSelect value={value} onChange={setValue} allLabel={allLabel} options={[{ value: 'completed', label: 'Completed' }, { value: 'running', label: 'Running' }, { value: 'failed', label: 'Failed' }]}/>; }
export const story = defineStory({ id: 'widgets/filter-select', displayName: 'FilterSelect', registryItem: 'widget-filter-select', Component: FilterSelectPreview, args: [{ variant: 'Status filter', initial: { allLabel: 'Any status' } }] });
