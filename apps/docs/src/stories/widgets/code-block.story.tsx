/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { CodeBlock } from '@foglamp/design-system/widgets/code-block';
import { defineStory } from '../../lib/story';
function CodeBlockPreview({ code = 'const answer = await client.traces.list({ limit: 20 });' }: { code?: string }) { return <div className="w-full"><CodeBlock code={code}/></div>; }
export const story = defineStory({ id: 'widgets/code-block', displayName: 'CodeBlock', registryItem: 'widget-code-block', Component: CodeBlockPreview, args: [{ variant: 'TypeScript', initial: { code: 'const answer = await client.traces.list({ limit: 20 });' } }, { variant: 'JSON', initial: { code: '{\n  "status": "ok",\n  "tokens": 1454\n}' } }] });
