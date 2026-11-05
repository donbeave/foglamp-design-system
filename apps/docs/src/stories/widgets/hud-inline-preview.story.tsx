/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { HudInlinePreview } from '@tailrocks/framerock/hud';
import { createMockHudStream } from '@tailrocks/framerock/hud';
import { defineStory } from '../../lib/story';
const stream = createMockHudStream([{ type: 'trace.start', ts: Date.now(), traceId: 'trace-inline', name: 'Invoice extractor', agentName: 'Invoice extractor', provider: 'anthropic', model: 'claude-3-7-sonnet' }]);
function HudInlinePreviewStory({ redact = false }: { redact?: boolean }) { return <div className="relative h-[300px] w-full"><HudInlinePreview stream={stream} defaultOpen={false} redact={redact} theme="dark"/></div>; }
export const story = defineStory({ id: 'widgets/hud-inline-preview', displayName: 'HudInlinePreview', registryItem: 'hud-foglamphud', Component: HudInlinePreviewStory, args: [{ variant: 'Inline activity pill', initial: { redact: false } }, { variant: 'Redacted activity', initial: { redact: true } }] });
