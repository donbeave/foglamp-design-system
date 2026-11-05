/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FilterSelect, PaginationFooter, SearchInput, SortableHead, ToggleChip, Toolbar } from '@tailrocks/framerock/widgets/data-table';
import { HeaderActionsSlotProvider, LayoutReserveProvider, useHeaderActionsSlot } from '@tailrocks/framerock/widgets/header-slot';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tailrocks/framerock/ui/table';
import { defineStory } from '../../lib/story';

const rows = [
  { id: 'tr_01HZXA21', name: 'Support assistant', status: 'Completed', project: 'Production', cost: '$0.0042' },
  { id: 'tr_01HZXA22', name: 'Invoice extraction', status: 'Running', project: 'Production', cost: '$0.0081' },
  { id: 'tr_01HZXA23', name: 'Customer routing', status: 'Failed', project: 'Staging', cost: '$0.0018' },
  { id: 'tr_01HZXA24', name: 'Knowledge retrieval', status: 'Completed', project: 'Production', cost: '$0.0036' },
  { id: 'tr_01HZXA25', name: 'Refund triage', status: 'Failed', project: 'Sandbox', cost: '$0.0021' },
  { id: 'tr_01HZXA26', name: 'Ticket summarizer', status: 'Queued', project: 'Staging', cost: '$0.0000' },
  { id: 'tr_01HZXA27', name: 'Policy assistant', status: 'Completed', project: 'Production', cost: '$0.0054' },
  { id: 'tr_01HZXA28', name: 'Lead qualification', status: 'Running', project: 'Sandbox', cost: '$0.0068' },
  { id: 'tr_01HZXA29', name: 'Document parser', status: 'Failed', project: 'Production', cost: '$0.0012' },
];
const statuses = ['Completed', 'Running', 'Failed', 'Queued'].map((value) => ({ value: value.toLowerCase(), label: value }));
const projects = [{ value: 'production', label: 'Production' }, { value: 'staging', label: 'Staging' }, { value: 'sandbox', label: 'Sandbox' }];

function HeaderActionsHost() {
  const slot = useHeaderActionsSlot();
  return (
    <header className="flex min-h-14 items-center justify-between gap-4 border-b px-6">
      <div><div className="text-sm font-semibold">Trace explorer</div><div className="text-xs text-muted-foreground">9 recent runs</div></div>
      <div ref={slot?.setEl} className="flex min-h-8 items-center justify-end" />
    </header>
  );
}

function DataTablePreview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [errors, setErrors] = useState(false);
  const [sort, setSort] = useState<{ key: 'name'; dir: 'asc' | 'desc' } | null>(null);
  const filtered = rows
    .filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))
    .filter((row) => !status || row.status.toLowerCase() === status)
    .filter((row) => !project || row.project.toLowerCase() === project)
    .filter((row) => !errors || row.status === 'Failed')
    .sort((a, b) => sort ? (sort.dir === 'asc' ? 1 : -1) * a.name.localeCompare(b.name) : 0);
  return (
    <HeaderActionsSlotProvider>
      <LayoutReserveProvider>
        <div className="w-full overflow-hidden rounded-xl border bg-card">
          <HeaderActionsHost />
          <div className="max-w-[34rem] py-5">
            <Toolbar trailing={<span className="whitespace-nowrap text-xs text-muted-foreground">{filtered.length} runs</span>}>
              <SearchInput value={search} onChange={setSearch} placeholder="Search runs…" />
              <FilterSelect value={status} onChange={setStatus} allLabel="Any status" options={statuses} />
              <FilterSelect value={project} onChange={setProject} allLabel="Any project" options={projects} />
              <ToggleChip active={errors} onClick={() => setErrors((value) => !value)}>Errors only</ToggleChip>
            </Toolbar>
          </div>
          <div className="overflow-x-auto px-4">
            <Table>
              <TableHeader><TableRow>
                <SortableHead sortKey="name" sort={sort} onSort={() => setSort(sort?.dir === 'asc' ? { key: 'name', dir: 'desc' } : { key: 'name', dir: 'asc' })}>Run</SortableHead>
                <TableHead>Status</TableHead><TableHead>Project</TableHead><TableHead align="right">Cost</TableHead>
              </TableRow></TableHeader>
              <TableBody>{filtered.map((row) => <TableRow key={row.id}>
                <TableCell><div className="font-medium">{row.name}</div><div className="text-xs text-muted-foreground">{row.id}</div></TableCell>
                <TableCell>{row.status}</TableCell><TableCell>{row.project}</TableCell><TableCell align="right">{row.cost}</TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </div>
          <div className="px-4"><PaginationFooter page={0} pageSize={25} total={filtered.length} shown={filtered.length} noun={['run', 'runs']} onPageChange={() => undefined} /></div>
        </div>
      </LayoutReserveProvider>
    </HeaderActionsSlotProvider>
  );
}

export const story = defineStory({
  id: 'widgets/data-table',
  displayName: 'DataTable',
  registryItem: 'widget-data-table',
  Component: DataTablePreview,
  args: [{ variant: 'Search, sibling filters, sortable rows', initial: {} }],
});
