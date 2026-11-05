/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FilterSelect, SearchInput, ToggleChip, Toolbar } from '@foglamp/design-system/widgets/data-table';
import { HeaderActionsSlotProvider, LayoutReserveProvider, useHeaderActionsSlot } from '@foglamp/design-system/widgets/header-slot';
import { defineStory } from '../../lib/story';

const statuses = [
  { value: 'completed', label: 'Completed' }, { value: 'running', label: 'Running' },
  { value: 'failed', label: 'Failed' }, { value: 'queued', label: 'Queued' },
  { value: 'cancelled', label: 'Cancelled' }, { value: 'timed_out', label: 'Timed out' },
  { value: 'retrying', label: 'Retrying' }, { value: 'waiting', label: 'Waiting' },
  { value: 'paused', label: 'Paused' },
];
const projects = [
  { value: 'production', label: 'Production' }, { value: 'staging', label: 'Staging' },
  { value: 'sandbox', label: 'Sandbox' },
];

function HeaderActionsHost() {
  const slot = useHeaderActionsSlot();
  return (
    <header className="flex min-h-14 items-center justify-between gap-4 border-b px-6">
      <div><div className="text-sm font-semibold">Trace explorer</div><div className="text-xs text-muted-foreground">Filter and inspect recent runs</div></div>
      <div ref={slot?.setEl} className="flex min-h-8 items-center justify-end" />
    </header>
  );
}

function ToolbarPreview({ containerWidth = 950 }: { containerWidth?: number }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('failed');
  const [project, setProject] = useState<string>('production');
  const [active, setActive] = useState(true);
  return (
    <HeaderActionsSlotProvider>
      <LayoutReserveProvider>
        <div style={{ width: containerWidth }} className="overflow-hidden rounded-xl border bg-card">
          <HeaderActionsHost />
          <div className="py-5">
            <Toolbar
              className="gap-2"
              trailing={<span className="whitespace-nowrap text-xs text-muted-foreground">1,284 runs · Last 7 days</span>}
            >
              <SearchInput value={query} onChange={setQuery} placeholder="Search runs…" />
              <FilterSelect value={status} onChange={setStatus} allLabel="Any status" options={statuses} />
              <FilterSelect value={project} onChange={setProject} allLabel="Any project" options={projects} />
              <ToggleChip active={active} onClick={() => setActive((value) => !value)}>Errors only</ToggleChip>
            </Toolbar>
          </div>
          <div className="h-48 border-t px-6 py-4 text-sm text-muted-foreground">
            Recent trace results continue below the toolbar.
          </div>
        </div>
      </LayoutReserveProvider>
    </HeaderActionsSlotProvider>
  );
}

export const story = defineStory({
  id: 'widgets/toolbar',
  displayName: 'Toolbar',
  registryItem: 'widget-toolbar',
  Component: ToolbarPreview,
  args: [
    { variant: 'Filters fit · 950px', initial: { containerWidth: 950 } },
    { variant: 'Actions lift into header · 656px', initial: { containerWidth: 656 } },
  ],
  frame: { width: 1100, height: 700 },
});
