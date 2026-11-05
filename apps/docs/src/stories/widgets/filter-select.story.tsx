/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FilterSelect } from '@foglamp/design-system/widgets/data-table';
import { defineStory } from '../../lib/story';

const statusOptions: { value: string; label: string }[] = [
  { value: 'completed', label: 'Completed' },
  { value: 'running', label: 'Running' },
  { value: 'failed', label: 'Failed' },
  { value: 'queued', label: 'Queued' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'timed_out', label: 'Timed out' },
  { value: 'retrying', label: 'Retrying' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'paused', label: 'Paused' },
];

function FilterSelectPreview({ allLabel = 'Any status' }: { allLabel?: string }) {
  const [value, setValue] = useState<string>('completed');
  return (
    <FilterSelect
      value={value}
      onChange={setValue}
      allLabel={allLabel}
      options={statusOptions}
    />
  );
}

export const story = defineStory({
  id: 'widgets/filter-select',
  displayName: 'FilterSelect',
  registryItem: 'widget-filter-select',
  Component: FilterSelectPreview,
  args: [
    { variant: 'Searchable status filter', initial: { allLabel: 'Any status' } },
    { variant: 'Reset label', initial: { allLabel: 'All run states' } },
  ],
});
