/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/demo/piece.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/demo/piece.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/**
 * Original design and implementation by Gustavo Fior (@gustavo-fior),
 * co-founder Abdul Haidar, and Foglamp Labs. Extracted AS-IS from
 * foglamp-labs/foglamp: apps/web/src/components/marketing/demo/piece.tsx.
 * Licensed under Apache-2.0.
 */

import { TableRow } from "@tailrocks/framerock/ui/table";
import { motion } from "motion/react";
import { createContext, useContext } from "react";

import { PIECE_VARIANTS } from "./entrance";

// One piece of a surface during the entrance (see entrance.ts): it inherits
// the surface's variant state and settles into place on its turn. Once the
// entrance is over, or under reduced motion, a piece that mounts (a tab
// switch) skips its initial state and renders in place like the real app.
// The variants stay on: taking them away makes Motion fall back to the
// piece's recorded initial values, which would hide it.

/** True while the entrance is running. Provided by DemoShell. */
export const EntranceContext = createContext(false);

/** True while the entrance is running. The containers between a wrapper
 * and its pieces use it to stop clipping and keep 3D while the pieces
 * drop (a clipped box flattens everything inside it). */
export function useEntering() {
  return useContext(EntranceContext);
}

const MotionRow = motion.create(TableRow);

/** A block-level piece: a div, or a list item. */
export function Piece({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  const entering = useContext(EntranceContext);
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      variants={PIECE_VARIANTS}
      initial={entering ? undefined : false}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** A table row piece: TableRow with the same behavior. */
export function PieceRow(props: React.ComponentProps<typeof MotionRow>) {
  const entering = useContext(EntranceContext);
  return (
    <MotionRow
      variants={PIECE_VARIANTS}
      initial={entering ? undefined : false}
      {...props}
    />
  );
}
