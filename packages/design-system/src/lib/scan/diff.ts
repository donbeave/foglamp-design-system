/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/diff.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/diff.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import type { GraphNode, ScanData } from "./scan";

export interface ScanDiff {
	addedNodes: GraphNode[];
	removedNodes: GraphNode[];
	changedNodes: GraphNode[];
	/** stat deltas, only the non-zero ones (e.g. { agents: +2 }). */
	statDeltas: Partial<Record<keyof ScanData["stats"], number>>;
	hasChanges: boolean;
}

export function diffScans(current: ScanData, previous: ScanData): ScanDiff {
	const prevById = new Map(previous.graph.nodes.map((n) => [n.id, n]));
	const curById = new Map(current.graph.nodes.map((n) => [n.id, n]));

	const addedNodes = current.graph.nodes.filter((n) => !prevById.has(n.id));
	const removedNodes = previous.graph.nodes.filter((n) => !curById.has(n.id));
	const changedNodes = current.graph.nodes.filter((n) => {
		const prev = prevById.get(n.id);
		if (!prev) return false;
		return prev.label !== n.label || prev.kind !== n.kind || prev.sub !== n.sub;
	});

	const statDeltas: ScanDiff["statDeltas"] = {};
	for (const key of Object.keys(current.stats) as (keyof ScanData["stats"])[]) {
		const delta = current.stats[key] - previous.stats[key];
		if (delta !== 0) statDeltas[key] = delta;
	}

	return {
		addedNodes,
		removedNodes,
		changedNodes,
		statDeltas,
		hasChanges:
			addedNodes.length + removedNodes.length + changedNodes.length > 0 ||
			Object.keys(statDeltas).length > 0,
	};
}
