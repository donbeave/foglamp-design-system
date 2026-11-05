/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/copy-button.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/copy-button.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../../../ui/button";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
	/** Text written to the clipboard on click. */
	value: string;
	idleLabel?: string;
	copiedLabel?: string;
	withIcon?: boolean;
	size?: React.ComponentProps<typeof Button>["size"];
	variant?: React.ComponentProps<typeof Button>["variant"];
	className?: string;
};

// A self-contained "copy to clipboard" button with a transient "Copied" state.
// Used for the hero's "Copy the prompt" and the install code block.
export function CopyButton({
	value,
	idleLabel = "Copy",
	copiedLabel = "Copied",
	withIcon = true,
	size = "sm",
	variant = "outline",
	className,
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	function copy() {
		void navigator.clipboard?.writeText(value);
		setCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopied(false), 1800);
	}

	return (
		<Button
			type="button"
			size={size}
			variant={variant}
			onClick={copy}
			className={className}
		>
			{withIcon && (copied ? <IconCheck /> : <IconCopy />)}
			{copied ? copiedLabel : idleLabel}
		</Button>
	);
}
