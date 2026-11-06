/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { FoglampHUD, createMockHudStream } from '@tailrocks/framerock/hud';
import { defineStory } from '../../lib/story';

const now = Date.now();
const stream = createMockHudStream([
  {
    type: 'trace.start',
    ts: now,
    traceId: 'trace-demo-1',
    name: 'Support assistant',
    agentName: 'Support assistant',
    provider: 'openai',
    model: 'gpt-4o',
  },
  {
    type: 'step.start',
    ts: now + 10,
    traceId: 'trace-demo-1',
    stepNumber: 0,
    provider: 'openai',
    model: 'gpt-4o',
  },
  {
    type: 'tool.start',
    ts: now + 40,
    traceId: 'trace-demo-1',
    toolCallId: 'call_lookup_1',
    toolName: 'lookupCustomerAccount',
    input: JSON.stringify({ email: 'jordan@acme.example', workspace: 'production' }),
  },
  {
    type: 'tool.end',
    ts: now + 110,
    traceId: 'trace-demo-1',
    toolCallId: 'call_lookup_1',
    toolName: 'lookupCustomerAccount',
    status: 'ok',
    durationMs: 70,
    output: JSON.stringify({ accountId: 'acct_01HZXA29', activeWorkers: 2, pendingRotation: true }),
  },
  {
    type: 'step.end',
    ts: now + 120,
    traceId: 'trace-demo-1',
    stepNumber: 0,
    status: 'ok',
    durationMs: 110,
    outputTps: 118,
  },
  {
    type: 'step.start',
    ts: now + 130,
    traceId: 'trace-demo-1',
    stepNumber: 1,
    provider: 'openai',
    model: 'gpt-4o',
  },
  {
    type: 'step.tokens',
    ts: now + 260,
    traceId: 'trace-demo-1',
    stepNumber: 1,
    outputTokens: 64,
    tps: 124,
  },
]);

function FoglampHUDPreview({
  defaultOpen = true,
  redact = false,
  hudTheme = 'dark',
}: {
  defaultOpen?: boolean;
  redact?: boolean;
  hudTheme?: 'light' | 'dark';
}) {
  return (
    <div className="relative h-[540px] w-full">
      <FoglampHUD
        key={`${defaultOpen}-${hudTheme}-${redact}`}
        stream={stream}
        defaultOpen={defaultOpen}
        redact={redact}
        theme={hudTheme}
      />
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/foglamp-hud',
  displayName: 'FoglampHUD',
  registryItem: 'hud-foglamphud',
  Component: FoglampHUDPreview,
  frame: { width: 960, height: 620 },
  args: [
    { variant: 'Live mock stream · dark theme', initial: { defaultOpen: true, redact: false, hudTheme: 'dark' } },
    { variant: 'Redacted compact view · dark theme', initial: { defaultOpen: false, redact: true, hudTheme: 'dark' } },
    { variant: 'Live mock stream · light theme', initial: { defaultOpen: true, redact: false, hudTheme: 'light' } },
  ],
});
