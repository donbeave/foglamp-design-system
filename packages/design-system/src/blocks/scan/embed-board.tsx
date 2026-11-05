/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/embed-board.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/embed-board.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/**
 * Original design and implementation by Gustavo Fior (@gustavo-fior),
 * with co-founder Abdul Haidar at Foglamp Labs. Apache-2.0.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/scan/embed-board.tsx.
 */


import type { ScanData } from "../../lib/scan/scan";

import { FlowMap } from "./flow-map";

// The iframe-embeddable scan view (/scan/<slug>/embed): just the interactive
// map plus a small attribution link back to the full scan page.
export function EmbedBoard({ data, slug }: { data: ScanData; slug: string }) {
	return (
		<div className="fixed inset-0 overflow-hidden bg-neutral-100 text-foreground dark:bg-background">
			<FlowMap graph={data.graph} focusKinds={null} frame />
			<a
				href={`/scan/${slug}`}
				target="_blank"
				rel="noreferrer"
				className="absolute bottom-3 right-3 z-20 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-(--custom-shadow) transition-colors hover:text-foreground"
			>
				{data.project.name} · scanned by foglamp
			</a>
		</div>
	);
}

export { EmbedBoard as EmbedBoardBlock };
