/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { SearchInput, ToggleChip, Toolbar } from '@foglamp/design-system/widgets/data-table';
import { defineStory } from '../../lib/story';
function ToolbarPreview() { const [query, setQuery] = useState(''); const [active, setActive] = useState(true); return <Toolbar trailing={<span className="text-xs text-muted-foreground">1,284 runs</span>}><SearchInput value={query} onChange={setQuery}/><ToggleChip active={active} onClick={() => setActive(!active)}>Errors only</ToggleChip></Toolbar>; }
export const story = defineStory({ id: 'widgets/toolbar', displayName: 'Toolbar', registryItem: 'widget-toolbar', Component: ToolbarPreview, args: [{ variant: 'Filters with trailing summary', initial: {} }] });
