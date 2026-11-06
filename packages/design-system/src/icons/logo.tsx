/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/logo.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/logo.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { cn } from "../lib/utils";

import { BrandMark } from "./brand-mark";

/**
 * Framerock logo lockup — the three-frame brand mark next to the "Framerock"
 * wordmark, set in Host Grotesk (the marketing display face, `font-display`).
 * Used in the marketing navbar and footer.
 */
export function Logo({ className, brandName = "Framerock" }: { className?: string; brandName?: string }) {
	return (
		<span className={cn("flex items-center gap-2", className)}>
			<BrandMark className="h-3.5 w-auto" />
			<span className="font-display text-lg font-semibold tracking-tight select-none">
				{brandName}
			</span>
		</span>
	);
}
