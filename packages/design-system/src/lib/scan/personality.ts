/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/personality.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/personality.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import type { ScanData } from "./scan";
import {
	IconAffiliateFilled,
	IconArchiveFilled,
	IconBoltFilled,
	IconClockFilled,
	IconGhostFilled,
	IconLeafFilled,
	type IconProps,
	IconSettingsFilled,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export interface Personality {
	title: string;
	Icon: ComponentType<IconProps>;
	/** Tailwind gradient classes for the card art. */
	gradient: string;
}

export const ARCHETYPES = {
	orchestrator: {
		title: "Tireless Orchestrator",
		Icon: IconGhostFilled,
		gradient:
			"from-orange-400 to-amber-300 dark:from-orange-700 dark:to-amber-600",
	},
	scheduler: {
		title: "Punctual Scheduler",
		Icon: IconClockFilled,
		gradient:
			"from-amber-400 to-yellow-300 dark:from-amber-700 dark:to-yellow-600",
	},
	integrator: {
		title: "Boundless Integrator",
		Icon: IconAffiliateFilled,
		gradient: "from-sky-400 to-cyan-300 dark:from-sky-700 dark:to-cyan-600",
	},
	toolsmith: {
		title: "Crafty Toolsmith",
		Icon: IconSettingsFilled,
		gradient:
			"from-violet-400 to-fuchsia-300 dark:from-violet-700 dark:to-fuchsia-600",
	},
	archivist: {
		title: "Meticulous Archivist",
		Icon: IconArchiveFilled,
		gradient:
			"from-emerald-400 to-teal-300 dark:from-emerald-700 dark:to-teal-600",
	},
	minimalist: {
		title: "Zen Minimalist",
		Icon: IconLeafFilled,
		gradient: "from-slate-400 to-zinc-300 dark:from-slate-700 dark:to-zinc-600",
	},
	builder: {
		title: "Steady Builder",
		Icon: IconBoltFilled,
		gradient: "from-blue-400 to-sky-300 dark:from-blue-700 dark:to-sky-600",
	},
} satisfies Record<string, Personality>;

export function derivePersonality(data: ScanData): Personality {
	const { stats, graph } = data;
	const kindCount = (k: string) =>
		graph.nodes.filter((n) => n.kind === k).length;
	const crons = kindCount("cron");
	const externals = kindCount("external");
	const stores = kindCount("store");
	const nodes = Math.max(graph.nodes.length, 1);

	// 0..~1.1 per archetype — ratios and saturation points chosen so a single
	// huge count can't sweep every board.
	const scores: [keyof typeof ARCHETYPES, number][] = [
		// Agent-dense graphs. Saturates at 8 and is discounted when agents are a
		// small share of an otherwise sprawling map.
		[
			"orchestrator",
			Math.min(stats.agents / 8, 1) * 0.7 + (stats.agents / nodes) * 0.5,
		],
		// Several scheduled jobs is genuinely rare and distinctive.
		["scheduler", Math.min(crons / 3, 1) * 1.1],
		// A web of third-party services.
		["integrator", Math.min(externals / 5, 1) * 1.05],
		// The toolbox outshines the agents.
		[
			"toolsmith",
			stats.tools >= 3
				? Math.min(stats.tools / Math.max(stats.agents, 1), 2) * 0.55
				: 0,
		],
		// Data-heavy: several distinct stores.
		["archivist", Math.min(stores / 3, 1) * 1.05],
		// Tiny, focused graphs.
		["minimalist", nodes <= 6 && stats.agents <= 2 ? 1 : 0],
	];

	scores.sort((a, b) => b[1] - a[1]);
	const [best, score] = scores[0]!;
	return score >= 0.5 ? ARCHETYPES[best] : ARCHETYPES.builder;
}
