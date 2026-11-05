/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 *
 * @provenance copied-1-to-1
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path packages/sdk/src/wire.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/packages/sdk/src/wire.ts
 *
 * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
 * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
 * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

export type Metadata = Record<string, string>;

export interface Customer {
  id: string;
  name?: string;
  imageUrl?: string;
}

export type SpanType = "agent" | "llm" | "tool" | "embedding" | "other";
export type SpanStatus = "ok" | "error" | "aborted";

export interface Usage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  reasoningTokens?: number;
  cachedInputTokens?: number;
  cacheWriteInputTokens?: number;
  imageCount?: number;
  webSearchCount?: number;
  requestCount?: number;
}

export interface Span {
  spanId: string;
  parentSpanId?: string;
  spanType: SpanType;
  name: string;
  /** Epoch milliseconds. */
  startTime: number;
  endTime: number;
  status: SpanStatus;
  errorMessage?: string;
  provider?: string;
  modelId?: string;
  usage?: Usage;
  ttftMs?: number;
  /** Total wall-clock ms spent inside reasoning blocks for this step. */
  reasoningDurationMs?: number;
  input?: string;
  output?: string;
  /** JSON catalog of tools offered to the model (name → {description, params}). */
  toolCatalog?: string;
  /** The system prompt / agent instructions for the run (root agent span only). */
  systemPrompt?: string;
  /** Pure model-call wall-clock for the step (ms), excluding tool execution. v7 only. */
  modelCallMs?: number;
  /**
   * Official provider response time (ms) from the AI SDK step `performance`
   * object: time spent waiting for the language-model response. Also feeds
   * `modelCallMs` (preferred over the derived value). v7 beta/canary only; absent on
   * v4–v6 wrap and older v7.
   */
  responseTimeMs?: number;
  /** Effective output tokens/sec over the full response (outputTokens/requestSeconds). v7 beta/canary only. */
  effectiveOutputTps?: number;
  /** Effective (input+output) tokens/sec over the full response. v7 beta/canary only. */
  effectiveTotalTps?: number;
  /** Output tokens/sec after the first output chunk; streaming steps only. v7 beta/canary only. */
  outputTps?: number;
  /** Input tokens/sec before the first output chunk (prefill rate); streaming steps only. v7 beta/canary only. */
  inputTps?: number;
  /**
   * Inter-output-chunk gap statistics (ms) from `performance`; present only for
   * streaming steps with ≥2 output chunks. v7 beta/canary only.
   */
  chunkJitter?: {
    min: number;
    p10: number;
    median: number;
    avg: number;
    p90: number;
    max: number;
  };
  /** OpenAI-style model build fingerprint (drift detection). */
  systemFingerprint?: string;
  /** JSON blob of provider safety ratings, as reported (no logprobs). */
  safetyMetadata?: string;
  /** JSON array of RAG/grounding citations (StepResult.sources); output-capture gated. */
  sources?: string;
  /** Rate-limit headroom, normalized cross-provider from response headers. */
  rateLimit?: {
    requestsLimit?: number;
    requestsRemaining?: number;
    requestsResetMs?: number;
    tokensLimit?: number;
    tokensRemaining?: number;
    tokensResetMs?: number;
  };
  metadata?: Metadata;
}

export interface Trace {
  traceId: string;
  traceName?: string;
  agentName?: string;
  workflowName?: string;
  workflowRunId?: string;
  sessionId?: string;
  customer?: Customer;
  metadata?: Metadata;
  spans: Span[];
}

export interface IngestPayload {
  version: "v1";
  traces: Trace[];
}
