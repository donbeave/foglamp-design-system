/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FoggyMessage } from '@tailrocks/framerock/widgets/foggy/foggy-message';
import { defineStory } from '../../lib/story';
function FoggyMessagePreview({ role = 'assistant' }: { role?: 'user' | 'assistant' }) { return <div className="w-full max-w-lg"><FoggyMessage message={{ id: 'message-1', role, parts: role === 'user' ? [{ type: 'text', text: 'Find the failed support traces from this morning.' }] : [{ type: 'text', text: 'I found **three failed traces** in the staging project.' }, { type: 'tool-searchTraces', state: 'output-available' }] }}/></div>; }
export const story = defineStory({ id: 'widgets/foggy-message', displayName: 'FoggyMessage', registryItem: 'widget-foggy-foggy-message', Component: FoggyMessagePreview, args: [{ variant: 'Assistant with tool activity', initial: { role: 'assistant' } }, { variant: 'User message', initial: { role: 'user' } }] });
