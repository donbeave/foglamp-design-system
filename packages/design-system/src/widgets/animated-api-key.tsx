/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/animated-api-key.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/animated-api-key.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import "slot-text/style.css";

import { useEffect, useState } from "react";
import { chromatic } from "slot-text";
import { SlotText } from "slot-text/react";

import { cn } from "../lib/utils";

/**
 * Reveals a freshly-created API key with a "slot machine" roll: it mounts
 * showing the name the user gave the key and then rolls, character by
 * character, into the real key value. slot-text only animates on a *text change
 * after mount* — mounting straight onto the value renders it statically — so the
 * name-then-value two-step is what produces the roll.
 *
 * The full key is always exposed via `aria-label` for screen readers, and
 * callers copy from the source string — never from the animated DOM, whose
 * hidden sizers would scramble a manual selection.
 */
export function AnimatedApiKey({
	from,
	value,
	className,
}: {
	/** The text the roll starts from — the name the user gave the key. */
	from: string;
	/** The real key value the roll lands on. */
	value: string;
	className?: string;
}) {
	const [text, setText] = useState(from);

	useEffect(() => {
		// Reset to the name, then flip to the real key on the next frame so the
		// change lands as an animated roll rather than a static rebuild.
		setText(from);
		const id = requestAnimationFrame(() => setText(value));
		return () => cancelAnimationFrame(id);
	}, [from, value]);

	return (
		<SlotText
			text={text}
			aria-label={value}
			options={{
				direction: "down",
				stagger: 15,
				duration: 220,
				bounce: 0,
				easing: "cubic-bezier(0.22, 1, 0.36, 1)",
				color: chromatic({ from: 360 }),
				skipUnchanged: false,
			}}
			className={cn("font-mono text-xs text-foreground", className)}
		/>
	);
}
