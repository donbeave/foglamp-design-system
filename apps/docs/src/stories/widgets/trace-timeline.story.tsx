/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { TraceTimeline } from '@foglamp/design-system/widgets/trace-timeline';
import { spanFixture } from './fixtures';
import { defineStory } from '../../lib/story';
function TraceTimelinePreview({ reveal = 'play' }: { reveal?: 'hold' | 'play' }) { const [selected, setSelected] = useState<string | null>(null); return <div className="w-full"><TraceTimeline spans={[spanFixture]} selected={selected} onSelect={setSelected} reveal={reveal}/><p className="mt-2 text-xs text-muted-foreground">Selected span: {selected ?? 'trace root'}</p></div>; }
export const story = defineStory({ id: 'widgets/trace-timeline', displayName: 'TraceTimeline', registryItem: 'widget-trace-timeline', Component: TraceTimelinePreview, args: [{ variant: 'Animated waterfall', initial: { reveal: 'play' } }, { variant: 'Hold reveal', initial: { reveal: 'hold' } }] });
