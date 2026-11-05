/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 *
 * @provenance copied-1-to-1
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/figure-reveal.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/figure-reveal.tsx
 *
 * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
 * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
 * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { useInView, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// The benefit figures each play one small animation the first time they scroll
// into view: bars fill, spans draw, dots land. Nothing loops and nothing
// replays. <FigureReveal> watches the viewport once, waits a beat so the
// reader has settled on the figure, and hands the result down; the figure's
// parts read it with useReveal() and run their own beat.
//
// Reduced motion counts as shown from the first paint, so every part renders
// in its final state and never animates.

/** The pause between a figure coming into view and its animation starting. */
const LEAD_MS = 400;

type Reveal = {
  /** True once the figure should be in its final state (in view, or reduced motion). */
  shown: boolean;
  reduce: boolean;
};

// Outside a figure everything is simply shown.
const RevealContext = createContext<Reveal>({ shown: true, reduce: true });

/** The hero's easing, so the figures land the same way the copy did. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FigureReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // A good third of the figure has to be on screen before it plays, so the
  // beat happens while the reader is looking at it, not at the fold.
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion() ?? false;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!inView || shown) return;
    const id = setTimeout(() => setShown(true), LEAD_MS);
    return () => clearTimeout(id);
  }, [inView, shown]);
  return (
    <div ref={ref} className="min-w-0">
      <RevealContext.Provider value={{ shown: shown || reduce, reduce }}>
        {children}
      </RevealContext.Provider>
    </div>
  );
}

export function useReveal() {
  return useContext(RevealContext);
}
