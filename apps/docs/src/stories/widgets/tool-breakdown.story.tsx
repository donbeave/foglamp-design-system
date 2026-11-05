/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ToolBreakdownView } from '@foglamp/design-system/widgets/tool-breakdown';
import { toolBreakdownFixture } from './fixtures';
import { defineStory } from '../../lib/story';
function ToolBreakdownPreview({ isLoading = false }: { isLoading?: boolean }) { return <div className="w-full max-w-xl"><ToolBreakdownView tools={toolBreakdownFixture} isLoading={isLoading}/></div>; }
export const story = defineStory({ id: 'widgets/tool-breakdown', displayName: 'ToolBreakdown', registryItem: 'widget-tool-breakdown', Component: ToolBreakdownPreview, args: [{ variant: 'Tool usage', initial: { isLoading: false } }, { variant: 'Loading', initial: { isLoading: true } }] });
