/**
 * Original design by Gustavo Fior (@gustavo-fior) and Foglamp Labs,
 * co-founded by Abdul Haidar. Extracted AS-IS from foglamp-labs/foglamp.
 */

export { type DiffOp, diffLines, lineDiff } from "./diff";
export {
  type InferOptions,
  type InferredVersion,
  inferVersions,
  type PromptSample,
  SLOT_LINE,
} from "./infer";
export { normalizePrompt, PROMPT_HASH_CHARS, promptHash } from "./normalize";
export { slotValues } from "./slots";
