/**
 * Original UI & design: Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs.
 * Extracted from https://github.com/foglamp-labs/foglamp — Apache-2.0.
 */
export type FoggyMessagePart =
  | { type: "text"; text: string }
  | { type: `tool-${string}` | "dynamic-tool"; toolName?: string; state: string };
export interface FoggyMessageData {
  id: string;
  role: "user" | "assistant" | "system";
  parts: FoggyMessagePart[];
}
