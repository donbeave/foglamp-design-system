/** Integration exports for the Foglamp Design System.
 * Original Foglamp UI and design by Gustavo Fior (@gustavo-fior), Abdul Haidar and Foglamp Labs; Apache-2.0.
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
