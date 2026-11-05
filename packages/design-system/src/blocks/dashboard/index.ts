/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

export * from "./overview-dashboard-block";
export * from "./traces-explorer-block";
export * from "./trace-waterfall-inspector-block";
export * from "./agent-detail-inspector-block";
export * from "./workflow-detail-block";
export * from "./session-conversation-inspector-block";
export * from "./eval-detail-block";

export type AgentDetailInspectorBlockProps = Parameters<typeof import("./agent-detail-inspector-block").AgentDetailInspectorBlock>[0];
export type WorkflowDetailBlockProps = Parameters<typeof import("./workflow-detail-block").WorkflowDetailBlock>[0];
export type SessionConversationInspectorBlockProps = Parameters<typeof import("./session-conversation-inspector-block").SessionConversationInspectorBlock>[0];
export type { Provider as EvalProvider } from "./eval-settings-fields";
