/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/app/scan/copy-scan-prompt-button.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/app/scan/copy-scan-prompt-button.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/**
 * Original design and implementation by Gustavo Fior (@gustavo-fior),
 * with co-founder Abdul Haidar at Foglamp Labs. Apache-2.0.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/app/scan/copy-scan-prompt-button.tsx.
 */


import { Button } from "../../ui/button";
import { cn } from "../../lib/utils";
import { BorderBeam } from "border-beam";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CopyIcon } from "../../widgets/leaf/copy-icon";
import { useCopied } from "../../hooks/use-copied";
import { SCAN_PROMPT } from "./scan-prompt";

// The scan page's "paste into your coding agent" button — same power-on
// BorderBeam as the landing page's CopyPromptButton, but it copies the
// codebase-scan extraction prompt.

const BEAM_TARGET = 1;
const BEAM_STEP = 0.04;
const BEAM_STEP_MS = 16;

function useCopyBeam(active: boolean, reduce: boolean) {
	const [strength, setStrength] = useState(0);
	const cur = useRef(0);
	useEffect(() => {
		const target = active ? BEAM_TARGET : 0;
		if (reduce) {
			cur.current = target;
			setStrength(target);
			return;
		}
		const id = setInterval(() => {
			const delta = target - cur.current;
			if (Math.abs(delta) <= BEAM_STEP) {
				cur.current = target;
				setStrength(target);
				clearInterval(id);
				return;
			}
			cur.current = +(cur.current + Math.sign(delta) * BEAM_STEP).toFixed(3);
			setStrength(cur.current);
		}, BEAM_STEP_MS);
		return () => clearInterval(id);
	}, [active, reduce]);
	return strength;
}

export function CopyScanPromptButton({ className, prompt = SCAN_PROMPT, onCopy }: { className?: string; prompt?: string; onCopy?: () => void }) {
	const reduce = useReducedMotion() ?? false;
	const { copied, markCopied } = useCopied(2000);
	const strength = useCopyBeam(copied, reduce);

	return (
		<BorderBeam
			size="pulse-inner"
			colorVariant="colorful"
			strength={strength}
			borderRadius={18}
			className="inline-flex rounded-full"
		>
			<Button
				size="lg"
				className={cn("text-base h-[37px] pl-4", className)}
				onClick={() => {
					void navigator.clipboard.writeText(prompt);
					onCopy?.();
					markCopied();
				}}
				aria-label="Copy the scan prompt"
			>
				<CopyIcon
					copied={copied}
					className="size-4 mb-px"
					// Inverted greens: the default Button's chip flips its bg against
					// the theme.
					checkClassName="size-4 mb-px text-green-400 dark:text-green-600"
				/>
				Copy scan prompt
			</Button>
		</BorderBeam>
	);
}
