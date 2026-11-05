/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { FoggyWidgetView } from '@foglamp/design-system/widgets/foggy/foggy-widget';
import { defineStory } from '../../lib/story';
const messages = [{ id: 'u1', role: 'user' as const, parts: [{ type: 'text' as const, text: 'Why did the latest trace fail?' }] }, { id: 'a1', role: 'assistant' as const, parts: [{ type: 'text' as const, text: 'The customer lookup timed out. I found three recent failures in the staging project.' }] }];
function FoggyWidgetPreview({ status = 'ready' }: { status?: 'ready' | 'submitted' | 'streaming' | 'error' }) { const [open, setOpen] = useState(true); return <div className="relative h-[520px] w-full"><FoggyWidgetView open={open} onOpenChange={setOpen} messages={messages} status={status} onSendMessage={({ text }) => { window.dispatchEvent(new CustomEvent('foglamp-story:message', { detail: text })); }}/></div>; }
export const story = defineStory({ id: 'widgets/foggy-widget', displayName: 'FoggyWidget', registryItem: 'widget-foggy-foggy-widget', Component: FoggyWidgetPreview, args: [{ variant: 'Ready conversation', initial: { status: 'ready' } }, { variant: 'Streaming response', initial: { status: 'streaming' } }] });
