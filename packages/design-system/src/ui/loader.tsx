/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path packages/ui/src/components/loader.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/packages/ui/src/components/loader.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { cn } from "@tailrocks/framerock/lib/utils";

// prompt-kit "text-shimmer" loader (https://www.prompt-kit.com/docs/loader):
// a label whose color sweeps left→right via an animated background-clip gradient.
// Relies on the `shimmer` keyframes + `--animate-shimmer` registered in
// styles/globals.css.

export type TextShimmerLoaderProps = {
	text?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const textSizes = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-base",
} as const;

export function TextShimmerLoader({
	text = "Thinking",
	size = "md",
	className,
}: TextShimmerLoaderProps) {
	return (
		<div
			role="status"
			aria-label={text}
			className={cn(
				"bg-[linear-gradient(to_right,var(--muted-foreground)_40%,var(--foreground)_60%,var(--muted-foreground)_80%)]",
				"bg-clip-text font-normal text-transparent bg-size-[200%_auto]",
				"animate-shimmer",
				textSizes[size],
				className,
			)}
		>
			{text}
		</div>
	);
}
