/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/range-context.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/range-context.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";

import {
	type RangeValue,
	defaultRange,
	exactRange,
	resolvePreset,
} from "../lib/range";

type RangeContextValue = {
	range: RangeValue;
	setRange: (range: RangeValue) => void;
};

const RangeContext = createContext<RangeContextValue | null>(null);

const STORAGE_KEY = "foglamp.range";

// Shared time-range filter so switching tabs keeps the same window. Relative
// presets are re-resolved to "now" on load; custom ranges restore their dates.
export function RangeProvider({ children }: { children: React.ReactNode }) {
	const [range, setRangeState] = useState<RangeValue>(() => defaultRange());

	useEffect(() => {
		if (typeof window === "undefined") return;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		try {
			const v = JSON.parse(raw) as { key: string; from: string; to: string };
			if (v.key && v.key !== "custom") {
				setRangeState(resolvePreset(v.key));
			} else if (v.from && v.to) {
				// Exact restore keeps sub-day windows (chart drag-zooms) intact;
				// calendar ranges are stored day-snapped already, so they round-trip.
				setRangeState(exactRange(new Date(v.from), new Date(v.to)));
			}
		} catch {
			// ignore malformed storage
		}
	}, []);

	const setRange = (next: RangeValue) => {
		setRangeState(next);
		if (typeof window !== "undefined") {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					key: next.key,
					from: next.from.toISOString(),
					to: next.to.toISOString(),
				}),
			);
		}
	};

	const value = useMemo<RangeContextValue>(
		() => ({ range, setRange }),
		[range],
	);

	return <RangeContext value={value}>{children}</RangeContext>;
}

export function useRange(): RangeContextValue {
	const ctx = use(RangeContext);
	if (!ctx) throw new Error("useRange must be used within RangeProvider");
	return ctx;
}
