/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useRange } from '@foglamp/design-system/widgets/range-context';
import { resolvePreset } from '@foglamp/design-system/lib/range';
import { RangeStoryFrame } from './fixtures';
import { defineStory } from '../../lib/story';
function RangeProviderPreview() { const { range, setRange } = useRange(); return <div className="flex items-center gap-3"><span className="text-sm">{range.label}</span><button className="rounded-md border px-2 py-1 text-xs" onClick={() => setRange(resolvePreset('24h'))}>Set 24h range</button></div>; }
function RangeProviderStory() { return <RangeStoryFrame><RangeProviderPreview/></RangeStoryFrame>; }
export const story = defineStory({ id: 'widgets/range-provider', displayName: 'RangeProvider', registryItem: 'widget-range-context', Component: RangeProviderStory, args: [{ variant: 'Shared range state', initial: {} }] });
