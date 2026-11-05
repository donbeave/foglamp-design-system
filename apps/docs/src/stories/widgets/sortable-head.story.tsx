/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { SortableHead } from '@tailrocks/framerock/widgets/data-table';
import { Table, TableHeader, TableRow } from '@tailrocks/framerock/ui/table';
import { defineStory } from '../../lib/story';
function SortableHeadPreview() { const [sort, setSort] = useState<{ key: 'name'; dir: 'asc' | 'desc' } | null>({ key: 'name', dir: 'desc' }); return <Table className="w-72"><TableHeader><TableRow><SortableHead sortKey="name" sort={sort} onSort={() => setSort(sort?.dir === 'desc' ? { key: 'name', dir: 'asc' } : { key: 'name', dir: 'desc' })}>Run name</SortableHead></TableRow></TableHeader></Table>; }
export const story = defineStory({ id: 'widgets/sortable-head', displayName: 'SortableHead', registryItem: 'widget-sortable-head', Component: SortableHeadPreview, args: [{ variant: 'Descending sort', initial: {} }] });
