/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { Button } from '@tailrocks/framerock/ui/button';
import { FoggyWidgetView } from '@tailrocks/framerock/widgets/foggy/foggy-widget';
import { defineStory } from '../../lib/story';

const initialMessages = [
  { id: 'u1', role: 'user' as const, parts: [{ type: 'text' as const, text: 'Why did the latest trace fail?' }] },
  {
    id: 'a1',
    role: 'assistant' as const,
    parts: [{ type: 'text' as const, text: 'The customer lookup timed out. I found three recent failures in the staging project.' }],
  },
];

function FoggyWidgetPreview({ status = 'ready' }: { status?: 'ready' | 'submitted' | 'streaming' | 'error' }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  return (
    <div className="relative flex h-[540px] w-full flex-col justify-between">
      <div className="flex items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground">
        <span>Assistant status: <strong className="text-foreground">{status}</strong> ({messages.length} messages)</span>
        {!open ? (
          <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
            Reopen Foggy
          </Button>
        ) : null}
      </div>
      <div className="relative flex-1">
        <FoggyWidgetView
          open={open}
          onOpenChange={setOpen}
          messages={messages}
          status={status}
          onSendMessage={({ text }) => {
            const trimmed = text.trim();
            if (!trimmed) return;
            setMessages((prev) => [
              ...prev,
              { id: `u-${prev.length + 1}`, role: 'user' as const, parts: [{ type: 'text' as const, text: trimmed }] },
              {
                id: `a-${prev.length + 2}`,
                role: 'assistant' as const,
                parts: [{ type: 'text' as const, text: `Checked recent spans for "${trimmed}". No additional errors found in the active window.` }],
              },
            ]);
            window.dispatchEvent(new CustomEvent('foglamp-story:message', { detail: trimmed }));
          }}
        />
      </div>
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/foggy-widget',
  displayName: 'FoggyWidget',
  registryItem: 'widget-foggy-foggy-widget',
  Component: FoggyWidgetPreview,
  frame: { height: 580 },
  args: [
    { variant: 'Ready conversation', initial: { status: 'ready' } },
    { variant: 'Streaming response', initial: { status: 'streaming' } },
  ],
});
