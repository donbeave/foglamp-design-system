/* Derived story fixtures for the Foglamp workbench; original UI and design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import type { ReactNode } from 'react';
import { RangeProvider } from '@foglamp/design-system/widgets/range-context';
import { ProjectProvider } from '@foglamp/design-system/widgets/project-context';

export function RangeStoryFrame({ children }: { children: ReactNode }) {
  return <RangeProvider>{children}</RangeProvider>;
}

export function ProjectStoryFrame({ children }: { children: ReactNode }) {
  return <ProjectProvider>{children}</ProjectProvider>;
}

export const spanFixture = {
  spanId: 'span-01', parentSpanId: null, spanType: 'llm', name: 'Summarize customer request',
  startTime: '2025-02-14T10:00:00.000Z', endTime: '2025-02-14T10:00:01.840Z', durationMs: 1840,
  status: 'ok', errorMessage: null, provider: 'openai', modelId: 'gpt-4o', inputTokens: 1240, outputTokens: 214,
  totalTokens: 1454, reasoningTokens: 0, cachedInputTokens: 620, cacheWriteInputTokens: 0, imageCount: 0,
  webSearchCount: 0, requestCount: 1, ttftMs: 340, reasoningDurationMs: null, totalCost: 0.0042, promptCost: 0.0021,
  completionCost: 0.0021, requestCost: null, imageCost: null, webSearchCost: null, reasoningCost: null,
  cacheReadCost: 0.0002, cacheWriteCost: null, pricingSource: 'fixture', pricedModelId: 'gpt-4o', pricedAt: null,
  metadata: { environment: 'staging' }, input: 'Summarize the latest support conversation.', output: 'The customer needs help rotating an API key.',
  toolCatalog: null, systemPrompt: null, promptHash: 'sha-01', modelCallMs: 1840, responseTimeMs: 1840,
  effectiveOutputTps: 116, effectiveTotalTps: 790, outputTps: 116, inputTps: 674,
  chunkJitter: null, systemFingerprint: null, safetyMetadata: null, sources: null, rateLimit: null,
} as const;

export const promptVersionsFixture = [
  { id: 'v1', number: 1, template: 'You are a helpful support assistant.\n{{customer_context}}', slotCount: 1, hashCount: 3, runCount: 128, firstSeen: '2025-02-01T08:00:00Z', lastSeen: '2025-02-08T12:00:00Z', current: false },
  { id: 'v2', number: 2, template: 'You are a concise support assistant.\n{{customer_context}}\n{{response_policy}}', slotCount: 2, hashCount: 5, runCount: 84, firstSeen: '2025-02-08T12:00:00Z', lastSeen: '2025-02-14T10:00:00Z', current: true },
];

export const toolBreakdownFixture = [
  { toolName: 'search_customers', callCount: 164, errorCount: 3, runCount: 98, totalRunCount: 120, latencyMs: { p50: 82, p95: 248, p99: 410 } },
  { toolName: 'create_ticket', callCount: 72, errorCount: 1, runCount: 68, totalRunCount: 120, latencyMs: { p50: 121, p95: 360, p99: 540 } },
];

export const costFixture = Array.from({ length: 12 }, (_, index) => ({
  bucket: new Date(Date.UTC(2025, 1, 14, index * 2)).toISOString(), inputCost: 0.006 + index * 0.0008,
  outputCost: 0.004 + index * 0.0005, cacheReadCost: 0.001, cacheWriteCost: 0, reasoningCost: 0.0003, otherCost: 0,
}));
