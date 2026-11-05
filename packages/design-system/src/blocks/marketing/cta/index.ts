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
