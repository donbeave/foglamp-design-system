/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/copy-button.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/copy-button.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { cn } from "../../lib/utils";

import { CopyIcon } from "./copy-icon";
import { useCopied } from "../../hooks/use-copied";

/** Copy a value to the clipboard with a brief check-mark confirmation.
 *
 * - `stopPropagation` — call `e.stopPropagation()` on click; use when the
 *   button sits inside a clickable table row or card.
 * - `iconSize` — Tailwind size class applied to both icons (default `"size-4"`).
 * - `className` — additional classes for the `<button>` element. */
export function CopyButton({
	value,
	title,
	stopPropagation,
	iconSize = "size-4",
	className,
}: {
	value: string;
	title: string;
	stopPropagation?: boolean;
	iconSize?: string;
	className?: string;
}) {
	const { copied, markCopied } = useCopied();
	return (
		<button
			type="button"
			title={title}
			onClick={(e) => {
				if (stopPropagation) e.stopPropagation();
				void navigator.clipboard.writeText(value);
				markCopied();
			}}
			className={cn(
				"inline-flex shrink-0 items-center justify-center rounded p-1 text-muted-foreground/60 cursor-pointer transition-colors hover:text-foreground",
				className,
			)}
		>
			<CopyIcon
				copied={copied}
				className={iconSize}
				checkClassName={cn(iconSize)}
			/>
		</button>
	);
}
