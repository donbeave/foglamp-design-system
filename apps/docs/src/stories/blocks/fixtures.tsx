/* Original fixtures shaped from Foglamp's public scan and setup contracts.
 * Source design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs.
 */
import type { ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { AppShellBlock } from '@foglamp/design-system/blocks/app-shell/app-shell-block';
import { FoglampLinkProvider } from '@foglamp/design-system/lib/link-context';
import type { ScanData } from '@foglamp/design-system/lib/scan/scan';
import type { DetectedPlan } from '@foglamp/design-system/lib/scan/instrumentation';

export const scanFixture: ScanData = {
  version: 1,
  project: { name: 'Foglamp', slug: 'foglamp', tagline: 'AI observability, clearly mapped', iconDomain: 'foglamp.dev', date: '2026-11-05' },
  stats: { agents: 2, models: 2, tools: 2, integrations: 1 },
  topModels: [{ id: 'gpt-4o', label: 'GPT-4o', domain: 'openai.com' }, { id: 'claude-sonnet', label: 'Claude Sonnet', domain: 'anthropic.com' }],
  topTools: [{ id: 'search', label: 'Search', domain: 'exa.ai' }, { id: 'database', label: 'Database' }],
  topIntegrations: [{ id: 'slack', label: 'Slack', domain: 'slack.com' }],
  graph: {
    nodes: [
      { id: 'webhook', label: 'Incoming webhook', kind: 'entry' },
      { id: 'support', label: 'Support agent', kind: 'agent' },
      { id: 'openai', label: 'GPT-4o', kind: 'model', domain: 'openai.com' },
      { id: 'search', label: 'Search docs', kind: 'tool', domain: 'exa.ai' },
      { id: 'postgres', label: 'Conversation store', kind: 'store' },
      { id: 'slack', label: 'Slack', kind: 'external', domain: 'slack.com' },
    ],
    edges: [
      { from: 'webhook', to: 'support', kind: 'triggers' },
      { from: 'support', to: 'openai', kind: 'calls' },
      { from: 'openai', to: 'search', kind: 'calls' },
      { from: 'support', to: 'postgres', kind: 'writes' },
      { from: 'support', to: 'slack', kind: 'calls' },
    ],
  },
};

export const planFixture: DetectedPlan = {
  version: 1,
  sdk: { major: 5, version: '5.0.12' },
  hasReactUi: true,
  scan: scanFixture,
  calls: [{ id: 'call-support', fn: 'generateText', sourceRef: 'src/agents/support.ts:42', modelId: 'gpt-4o' }],
  decisions: {
    agents: [{ id: 'support-agent', name: 'Support agent', callIds: ['call-support'], oneOff: false, confidence: 'high', sourceRef: 'src/agents/support.ts:42', rationale: 'Handles incoming customer support requests.' }],
    workflows: [], sessions: [],
    customer: { recommended: false, confidence: 'high', rationale: 'This example serves a single workspace.' },
  },
};

export function StorySurface({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl p-6">{children}</div>;
}

function LocalStoryLink({ onClick, ...props }: ComponentPropsWithoutRef<'a'>) {
  return <a {...props} onClick={event => { event.preventDefault(); onClick?.(event); }} />;
}

export function StoryLinkAdapter({ children }: { children: ReactNode }) {
  return <FoglampLinkProvider component={LocalStoryLink}>{children}</FoglampLinkProvider>;
}

export function DashboardStoryShell({ children }: { children: ReactNode }) {
  return <StoryLinkAdapter><div className="h-[760px] overflow-hidden rounded-lg"><AppShellBlock pathname="/overview" user={{ name: 'Alex Rivera', email: 'alex@example.com' }}>{children}</AppShellBlock></div></StoryLinkAdapter>;
}

export const resolveStoryFavicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
