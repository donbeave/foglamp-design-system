/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { RangePicker } from '@foglamp/design-system/widgets/range-picker';
import { resolvePreset } from '@foglamp/design-system/lib/range';
import { defineStory } from '../../lib/story';
function RangePickerPreview({ compact = false }: { compact?: boolean }) { const [range, setRange] = useState(() => resolvePreset('7d')); return <RangePicker value={range} onChange={setRange} compact={compact}/>; }
export const story = defineStory({ id: 'widgets/range-picker', displayName: 'RangePicker', registryItem: 'widget-range-picker', Component: RangePickerPreview, args: [{ variant: 'Full control', initial: { compact: false } }, { variant: 'Compact trigger', initial: { compact: true } }] });
