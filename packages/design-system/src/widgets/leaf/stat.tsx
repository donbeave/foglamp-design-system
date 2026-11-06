/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/stat.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/stat.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { cn } from "../../lib/utils";

/** A two-line label/value stat, used in agent and workflow card grids.
 * `className` applies to the outer wrapper; `valueClassName` applies to the
 * value span (use for heat-tinted cost colors). */
export function Stat({
	label,
	value,
	emphasis,
	className,
	valueClassName,
}: {
	label: string;
	value: React.ReactNode;
	emphasis?: boolean;
	className?: string;
	valueClassName?: string;
}) {
	return (
		<div className={cn("flex flex-col gap-0.5", className)}>
			<span className="text-xs text-muted-foreground">{label}</span>
			<span
				className={cn(
					"tabular-nums",
					emphasis && "font-medium",
					valueClassName,
				)}
			>
				{value}
			</span>
		</div>
	);
}
