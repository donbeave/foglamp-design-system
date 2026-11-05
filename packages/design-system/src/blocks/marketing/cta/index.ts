/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Composed AS-IS from foglamp-labs/foglamp landing CTA modules.
 * Licensed under Apache-2.0.
 */
export {
	CtaSection,
	DriftingFogCtaBlock,
	type DriftingFogCtaBlockProps,
} from "./cta";
export {
	CompactCtaSection,
	type CompactCtaSectionProps,
} from "./compact-cta";
export {
	CopyPromptButton,
	type CopyPromptButtonProps,
} from "./copy-prompt-button";
export { Faq } from "./faq";
export { AskFoggy, type AskFoggyProps, type AskFoggyRequest } from "./ask-foggy";
export { AgentDetails } from "./cta-agent-details";
export { buildKeyedPrompt, buildLandingPrompt, DOCS_URL } from "./agent-prompt";
