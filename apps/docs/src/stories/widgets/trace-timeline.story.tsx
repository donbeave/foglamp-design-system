/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { TraceTimeline } from '@tailrocks/framerock/widgets/trace-timeline';
import type { TraceSpan } from '@tailrocks/framerock/lib/types';
import { spanFixture } from './fixtures';
import { defineStory } from '../../lib/story';

function makeSpan(spanId: string, overrides: Partial<TraceSpan>): TraceSpan {
  return { ...spanFixture, spanId, ...overrides };
}
const utc = (seconds: string) => `2025-02-14 10:00:${seconds}`;

const spans: TraceSpan[] = [
  makeSpan('span-root', {
    parentSpanId: null,
    startTime: utc('00.000'),
    endTime: utc('02.400'),
    spanType: 'agent',
    name: 'Support assistant',
    modelId: null,
    provider: null,
    durationMs: 2_400,
    modelCallMs: null,
    ttftMs: null,
    reasoningDurationMs: null,
  }),
  ...[0, 1, 2].map((index) => makeSpan(`span-retrieval-${index + 1}`, {
    parentSpanId: 'span-root',
    spanType: 'llm',
    name: 'Retrieve customer context',
    startTime: utc(`00.${String(200 + index * 400).padStart(3, '0')}`),
    endTime: utc(`00.${String(500 + index * 400).padStart(3, '0')}`),
    durationMs: 300,
    input: 'Find the relevant account and recent support history.',
    output: 'Customer context retrieved for the current request.',
    modelCallMs: 220,
    ttftMs: 100,
    reasoningDurationMs: 70,
  })),
  makeSpan('span-final-answer', {
    parentSpanId: 'span-root',
    spanType: 'llm',
    name: 'Compose response',
    startTime: utc('01.600'),
    endTime: utc('02.300'),
    durationMs: 700,
    input: 'Use the retrieved customer context to answer the question.',
    output: 'Confirm both workers use the replacement key before revoking the old one.',
    modelCallMs: 490,
    ttftMs: 180,
    reasoningDurationMs: 150,
  }),
];

function TraceTimelinePreview({ reveal = 'play' }: { reveal?: 'hold' | 'play' }) {
  const [selected, setSelected] = useState<string | null>(null);
  return <div className="w-full"><TraceTimeline spans={spans} selected={selected} onSelect={setSelected} reveal={reveal}/><p className="mt-2 text-xs text-muted-foreground">Select a span or expand the three repeated context retrieval calls. Selected span: {selected ?? 'trace root'}</p></div>;
}

export const story = defineStory({
  id: 'widgets/trace-timeline',
  displayName: 'TraceTimeline',
  registryItem: 'widget-trace-timeline',
  Component: TraceTimelinePreview,
  frame: { width: 960, height: 560 },
  args: [
    { variant: 'Repeated retrievals and model-call phases', initial: { reveal: 'play' } },
    { variant: 'Hold the phase bars before reveal', initial: { reveal: 'hold' } },
  ],
});
