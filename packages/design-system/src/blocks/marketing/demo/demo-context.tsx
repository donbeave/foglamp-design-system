/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 *
 * @provenance copied-1-to-1
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/demo/demo-context.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/demo/demo-context.tsx
 *
 * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
 * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
 * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { createContext, useContext } from "react";

import type { DemoTab } from "./mock-data";

export type DetailView =
	| { type: "trace"; id: string }
	| { type: "eval"; id: string }
	| { type: "agent"; id: string }
	| { type: "workflow"; id: string }
	| { type: "session"; id: string }
	| null;

type DemoContextValue = {
	tab: DemoTab;
	// Ignored until the demo is interactive (see DashboardDemo).
	setTab: (tab: DemoTab) => void;
	// False while the hero's entrance is still running: the nav shows its
	// links but does not take a click.
	interactive: boolean;
	detail: DetailView;
	openDetail: (detail: NonNullable<DetailView>) => void;
	closeDetail: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({
	value,
	children,
}: {
	value: DemoContextValue;
	children: React.ReactNode;
}) {
	return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
	const ctx = useContext(DemoContext);
	if (!ctx) throw new Error("useDemo must be used within <DemoProvider>");
	return ctx;
}
