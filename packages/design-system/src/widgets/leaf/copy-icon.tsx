/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/copy-icon.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/copy-icon.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/copy-icon.tsx; derived here under Apache-2.0.
 */
import { IconCircleCheckFilled, IconCopyFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "../../lib/utils";

export function CopyIcon({
  copied,
  className,
  checkClassName,
}: {
  copied: boolean;
  /** Classes applied to the copy icon (and the check icon unless `checkClassName` is set). */
  className?: string;
  /** Classes applied to the check icon. Defaults to `className`. */
  checkClassName?: string;
}) {
  // `relative` so the exiting (position: absolute, via popLayout) icon is pinned
  // directly over the entering one instead of momentarily stacking below it.
  return (
    <span className="relative inline-flex">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          className="inline-flex"
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.25, bounce: 0 }}
        >
          {copied ? (
            <IconCircleCheckFilled
              className={cn(
                // Page-surface greens. Inside a default-variant Button the chip's
                // bg inverts against the theme, so those call sites pass the
                // inverted pair via `checkClassName`.
                "text-green-600 dark:text-green-400",
                checkClassName ?? className
              )}
            />
          ) : (
            <IconCopyFilled className={className} />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
