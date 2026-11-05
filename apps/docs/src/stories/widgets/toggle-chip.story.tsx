/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { ToggleChip } from '@tailrocks/framerock/widgets/data-table';
import { defineStory } from '../../lib/story';
function ToggleChipPreview({ initial = false }: { initial?: boolean }) { const [active, setActive] = useState(initial); return <ToggleChip active={active} onClick={() => setActive(!active)}>Errors only</ToggleChip>; }
export const story = defineStory({ id: 'widgets/toggle-chip', displayName: 'ToggleChip', registryItem: 'widget-toggle-chip', Component: ToggleChipPreview, args: [{ variant: 'Inactive', initial: { initial: false } }, { variant: 'Active', initial: { initial: true } }] });
