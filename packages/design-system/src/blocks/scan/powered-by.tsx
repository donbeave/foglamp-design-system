/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/powered-by.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/powered-by.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { FramerockLink as Link } from "../../lib/link-context";

import { BrandMark } from "../../icons/brand-mark";

// Small attribution pill at the top of the scan sidebar (where the
// personality card used to live — that may come back later).
export function PoweredBy() {
	return (
		<Link
			href="/"
			className="flex w-fit items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-(--custom-shadow) transition-opacity hover:opacity-80"
			target="_blank"
		>
			<span className="text-xs text-muted-foreground">Powered by</span>
			<span className="flex items-center gap-1.5">
				<BrandMark className="h-2.5 w-auto" />
				<span className="font-display text-sm font-semibold tracking-tight select-none">
					Framerock
				</span>
			</span>
		</Link>
	);
}
