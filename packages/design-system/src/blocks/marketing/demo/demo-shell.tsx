/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/demo/demo-shell.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/demo/demo-shell.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { cn } from "@tailrocks/framerock/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { DROP_AT, landPieces } from "./entrance";
import { EntranceContext } from "./piece";

// The landing demo's chrome (the persistent frame and the inset surface in
// <HeroDemo>) is in place before this shell mounts. What this shell owns
// lands on it in two beats (see entrance.ts):
//   1. the sidebar's pieces, one after another;
//   2. shortly after, the pieces of the content inside the inset surface.
// Both run on mount, and because this shell only mounts once the lazy demo
// chunk has resolved, its mount is the "loading finished" signal the two
// beats hang off of. The two wrappers below do not move themselves; they
// only cue their pieces (see piece.tsx). When the last piece of the second
// beat lands, onSettled fires so the hero can swing the frame flat.
// Reduced-motion renders everything in place.
//
// A piece's lift only reads in 3D, and a clipped box flattens everything
// inside it, so while the entrance runs the content box and its scroller
// keep 3D and do not clip. The traces view fits the frame, so nothing
// spills. Clipping and scrolling come back once the last piece has landed.

export function DemoShell({
  sidebar,
  children,
  interactive = true,
  onSettled,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  // False while the hero's entrance runs. The content takes no clicks or
  // hovers until it flips (the sidebar holds its own buttons).
  interactive?: boolean;
  onSettled?: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  // Flips once the content's last piece has landed. Pieces mounted after
  // that (a tab switch) render in place.
  const [done, setDone] = useState(false);
  const entering = !reduce && !done;

  return (
    <EntranceContext value={entering}>
      {/* Sidebar, beat 1. It has no surface of its own: its pieces land
          straight on the chrome. */}
      <motion.div
        {...landPieces(DROP_AT.sidebar, reduce)}
        className={cn("hidden w-56 shrink-0 md:block", entering && "transform-3d")}
      >
        {sidebar}
      </motion.div>

      {/* Inset content, beat 2. This box is transparent: the surface and its
          shadow belong to the placeholder in <HeroDemo>, which sits one layer
          below at the exact same rect and is there from first paint. Painting
          them here as well would stack two shadows once this lazy shell
          mounts. */}
      <motion.div
        {...landPieces(DROP_AT.content, reduce)}
        onAnimationComplete={() => {
          setDone(true);
          onSettled?.();
        }}
        className={cn(
          "relative m-2 ml-0 flex min-w-0 flex-1 flex-col rounded-md squircle:rounded-xl corner-squircle max-md:ml-2",
          entering ? "transform-3d" : "overflow-hidden",
          !interactive && "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "no-scrollbar min-h-0 flex-1",
            entering ? "transform-3d" : "overflow-y-auto"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-4 py-6 pb-16",
              entering && "transform-3d"
            )}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </EntranceContext>
  );
}
