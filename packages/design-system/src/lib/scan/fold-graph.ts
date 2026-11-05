/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/fold-graph.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/fold-graph.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import type { GraphEdge, NodeKind, ScanData } from "./scan";

export interface Embed {
	id: string;
	label: string;
	kind: "model" | "tool";
	domain?: string;
}

export interface FoldedNode {
	id: string;
	label: string;
	kind: NodeKind;
	domain?: string;
	sub?: string;
	detail?: string;
	group?: string;
	sourceRef?: string;
	/** Models and tools this node uses, rendered inline (models first). */
	embeds: Embed[];
}

export interface FoldedGraph {
	nodes: FoldedNode[];
	edges: GraphEdge[];
}

const FOLDED: ReadonlySet<NodeKind> = new Set<NodeKind>(["model", "tool"]);

export function foldGraph(graph: ScanData["graph"]): FoldedGraph {
	const byId = new Map(graph.nodes.map((n) => [n.id, n]));
	const embedsByNode = new Map<string, Embed[]>();

	for (const e of graph.edges) {
		const target = byId.get(e.to);
		const source = byId.get(e.from);
		if (!target || !source || !FOLDED.has(target.kind)) continue;
		const arr = embedsByNode.get(source.id) ?? [];
		if (!arr.some((x) => x.id === target.id)) {
			arr.push({
				id: target.id,
				label: target.label,
				kind: target.kind as "model" | "tool",
				domain: target.domain,
			});
		}
		embedsByNode.set(source.id, arr);
	}

	const nodes: FoldedNode[] = graph.nodes
		.filter((n) => !FOLDED.has(n.kind))
		.map((n) => ({
			id: n.id,
			label: n.label,
			kind: n.kind,
			domain: n.domain,
			sub: n.sub,
			detail: n.detail,
			group: n.group,
			sourceRef: n.sourceRef,
			// models before tools
			embeds: (embedsByNode.get(n.id) ?? []).sort((a, b) =>
				a.kind === b.kind ? 0 : a.kind === "model" ? -1 : 1,
			),
		}));

	const alive = new Set(nodes.map((n) => n.id));
	const edges = graph.edges.filter((e) => alive.has(e.from) && alive.has(e.to));

	return { nodes, edges };
}
