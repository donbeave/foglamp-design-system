/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { CostBreakdownView } from '@tailrocks/framerock/widgets/cost-breakdown';
import { resolvePreset } from '@tailrocks/framerock/lib/range';
import { costFixture, RangeStoryFrame } from './fixtures';
import { defineStory } from '../../lib/story';
function CostBreakdownPreview({ isUpdating = false }: { isUpdating?: boolean }) { return <RangeStoryFrame><CostBreakdownView data={costFixture} range={resolvePreset('24h')} isUpdating={isUpdating}/></RangeStoryFrame>; }
export const story = defineStory({ id: 'widgets/cost-breakdown', displayName: 'CostBreakdown', registryItem: 'widget-cost-breakdown', Component: CostBreakdownPreview, frame: { width: 960, height: 420 }, args: [{ variant: 'Cost by token category', initial: { isUpdating: false } }, { variant: 'Refreshing range', initial: { isUpdating: true } }] });
