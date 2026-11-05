/* Derived for the Foglamp Design System portal by the project contributors.
 * It adapts Foglamp concepts and assets; this new integration code is not represented as upstream-authored.
 * Original project: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs; Apache-2.0 source project.
 */
/** Standalone shape of a span returned by Foglamp's trace detail service. */
export interface TraceSpan {
  spanId: string;
  parentSpanId: string | null;
  spanType: string;
  name: string;
  startTime: string;
  endTime: string;
  durationMs: number;
  status: string;
  errorMessage: string | null;
  provider: string | null;
  modelId: string | null;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  reasoningTokens: number;
  cachedInputTokens: number;
  cacheWriteInputTokens: number;
  imageCount: number;
  webSearchCount: number;
  requestCount: number;
  ttftMs: number | null;
  reasoningDurationMs: number | null;
  totalCost: number | null;
  promptCost: number | null;
  completionCost: number | null;
  requestCost: number | null;
  imageCost: number | null;
  webSearchCost: number | null;
  reasoningCost: number | null;
  cacheReadCost: number | null;
  cacheWriteCost: number | null;
  pricingSource: string | null;
  pricedModelId: string | null;
  pricedAt: string | null;
  metadata: Record<string, string>;
  input: string | null;
  output: string | null;
  toolCatalog: string | null;
  systemPrompt: string | null;
  promptHash: string | null;
  modelCallMs: number | null;
  responseTimeMs: number | null;
  effectiveOutputTps: number | null;
  effectiveTotalTps: number | null;
  outputTps: number | null;
  inputTps: number | null;
  chunkJitter: { min: number | null; p10: number | null; median: number | null; avg: number | null; p90: number | null; max: number | null } | null;
  systemFingerprint: string | null;
  safetyMetadata: string | null;
  sources: string | null;
  rateLimit: { requestsLimit: number | null; requestsRemaining: number | null; requestsResetMs: number | null; tokensLimit: number | null; tokensRemaining: number | null; tokensResetMs: number | null } | null;
}

export type * from "./scan/scan";
export type * from "./scan/alerts";
export type * from "./scan/instrumentation";
export type * from "./scan/v1";
