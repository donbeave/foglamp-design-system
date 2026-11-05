/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/lib/trace-timeline.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/lib/trace-timeline.ts
 * @secondary-upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/packages/api/src/services/traces.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
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
