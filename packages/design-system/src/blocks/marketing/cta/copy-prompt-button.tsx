/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/copy-prompt-button.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/copy-prompt-button.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../../../ui/button";
import { cn } from "../../../lib/utils";
import { BorderBeam } from "border-beam";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CopyIcon } from "../../../widgets/leaf/copy-icon";
import { useCopied } from "../../../hooks/use-copied";
import { ClaudeCodeLogo, OpenAILogo } from "../../../icons/brand-logos";
import { buildLandingPrompt } from "./agent-prompt";

// The "paste into your coding agent" prompt button, shared by the hero and the
// closing CTA. On copy, a colorful BorderBeam powers on around the button, the
// same effect (and ramp) the hero uses on its dashboard chrome, then powers
// back off once the copied flag clears.

const BEAM_TARGET = 100; // resting strength while a copy is fresh
const BEAM_MS = 900; // how long the beam stays on; the check lingers longer
const BEAM_STEP = 0.05;
const BEAM_STEP_MS = 15;

// Ramps the beam strength toward its target (on copy) or back to 0, one small
// step per frame, so it glows to life around the button rather than snapping.
// Reduced-motion users get the end state immediately.
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

export type CopyPromptButtonProps = {
  className?: string;
  hero?: boolean;
  prompt?: string;
  onCopied?: () => void;
};

export function CopyPromptButton({
  className,
  hero,
  prompt = buildLandingPrompt(),
  onCopied,
}: CopyPromptButtonProps) {
  const reduce = useReducedMotion() ?? false;
  const { copied, markCopied } = useCopied(2000);
  // The beam runs on its own, shorter clock than the check icon: a quick
  // flash of confirmation, not a glow for the whole copied window.
  const { copied: beamOn, markCopied: markBeam } = useCopied(BEAM_MS);
  const strength = useCopyBeam(beamOn, reduce);

  const copyPrompt = () => {
    void navigator.clipboard.writeText(prompt);
    onCopied?.();
    markCopied();
    markBeam();
  };

  return (
    <BorderBeam
      size="pulse-inner"
      colorVariant="colorful"
      strength={strength}
      borderRadius={999}
      className="inline-flex"
    >
      <Button
        size="lg"
        className={cn(
          "text-base h-10 px-4 shadow-none hover:bg-neutral-800 hover:dark:bg-neutral-200",
          className
        )}
        onClick={copyPrompt}
        aria-label="Copy the coding-agent prompt"
      >
        {/* The agents the prompt is for, then the label, then the copy
            affordance that flips to a check while a copy is fresh. */}
        <span className="flex items-center gap-1.5 mr-0.5">
          <OpenAILogo
            className={`${hero ? "size-3" : "size-3.5"} text-neutral-200 dark:text-neutral-800`}
          />
          <ClaudeCodeLogo className={`${hero ? "size-4.5" : "size-5"}`} />
        </span>
        Copy agent prompt
        <CopyIcon
          copied={copied}
          className={`${hero ? "size-3.5" : "size-4"} ml-0.5 mt-px text-neutral-400 dark:text-neutral-600`}
          // Inverted greens: the default Button flips its bg against the theme.
          checkClassName={`${hero ? "size-3.5" : "size-4"} text-green-400 dark:text-green-600 ml-0.5 mt-px`}
        />
      </Button>
    </BorderBeam>
  );
}
