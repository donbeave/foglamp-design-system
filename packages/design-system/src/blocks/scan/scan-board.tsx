/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/scan-board.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/scan-board.tsx
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
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/scan/scan-board.tsx.
 */


import type { NodeKind, ScanData } from "../../lib/scan/scan";
import { useState } from "react";

import { ChangesCard } from "./changes-card";
import { FlowMap } from "./flow-map";
import { KIND_ORDER } from "./kinds";
import { LeftRail } from "./left-rail";
import { PoweredBy } from "./powered-by";
import { ScanActions, ShareBar } from "./share-bar";

export function ScanBoard({
	data,
	previous,
}: {
	data: ScanData;
	/** The scan as it was before its last update — drives the changes card. */
	previous?: ScanData | null;
}) {
	// Kinds present in the map, in canonical order — explained by the legend.
	const kinds = KIND_ORDER.filter((k) =>
		data.graph.nodes.some((n) => n.kind === k),
	);
	// Hovering a legend group spotlights those kinds on the map.
	const [focusKinds, setFocusKinds] = useState<NodeKind[] | null>(null);

	return (
		<div className="fixed inset-0 overflow-hidden bg-neutral-100 text-foreground dark:bg-background">
			{/* Top-left column: attribution pill with the details rail hanging below. */}
			<div className="absolute top-6 left-6 z-20 flex w-fit flex-col gap-4">
				<PoweredBy />
				<LeftRail data={data} />
				{previous ? <ChangesCard data={data} previous={previous} /> : null}
			</div>
			<div className="absolute top-6 right-6 z-20">
				<ScanActions />
			</div>
			<FlowMap graph={data.graph} focusKinds={focusKinds} />
			<ShareBar
				kinds={kinds}
				focusKinds={focusKinds}
				onFocusKinds={setFocusKinds}
			/>
		</div>
	);
}

export { ScanBoard as ScanBoardBlock };
