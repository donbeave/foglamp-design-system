/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 *
 * @provenance copied-1-to-1
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/favicon.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/favicon.ts
 *
 * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
 * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
 * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

export function faviconUrl(domain: string): string {
	return `/api/favicon?domain=${encodeURIComponent(domain)}`;
}

/**
 * Product-accurate icon domains for models: agents often emit the provider's
 * corporate domain (google.com → the "G"), but the model deserves its product
 * mark (Gemini's spark). Keyed by label match, applied only to model items.
 */
const MODEL_DOMAIN_FIXES: [RegExp, string][] = [
	[/gemini/i, "gemini.google.com"],
	[/claude/i, "claude.ai"],
	[/gpt|^o[0-9]/i, "openai.com"],
];

export function modelDomain(
	label: string,
	domain?: string,
): string | undefined {
	for (const [re, fixed] of MODEL_DOMAIN_FIXES) {
		if (re.test(label)) return fixed;
	}
	return domain;
}
