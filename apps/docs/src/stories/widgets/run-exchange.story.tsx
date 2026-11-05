/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Conversation } from '@foglamp/design-system/widgets/run-exchange';
import { defineStory } from '../../lib/story';
const input = JSON.stringify([{ role: 'user', content: 'Summarize the latest customer support ticket.' }]);
const output = JSON.stringify([{ role: 'assistant', content: 'The customer cannot access their workspace after rotating an API key.' }]);
function RunExchangePreview({ clamp = 240 }: { clamp?: number }) { return <div className="w-full max-w-xl rounded-xl border bg-card p-4"><Conversation input={input} output={output} emptyHint="No response was recorded." clamp={clamp}/></div>; }
export const story = defineStory({ id: 'widgets/run-exchange', displayName: 'RunExchange', registryItem: 'widget-run-exchange', Component: RunExchangePreview, args: [{ variant: 'Input and response', initial: { clamp: 240 } }, { variant: 'Unclamped', initial: { clamp: 0 } }] });
