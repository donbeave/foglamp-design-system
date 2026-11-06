/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/favicon.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/favicon.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { getGoogleFavicon } from "../../widgets/leaf/favicon";

export { getGoogleFavicon };

export function faviconUrl(domain: string): string {
	return getGoogleFavicon(domain);
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
