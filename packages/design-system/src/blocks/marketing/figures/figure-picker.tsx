/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/figure-picker.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/figure-picker.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { FigureReveal } from "./figure-reveal";
import { FIGURES, type Section } from "./figures";
import { Suspense } from "react";

const CHOSEN: Record<Section, string> = {
  costs: "chart",
  traces: "xray",
  quality: "review",
};

/** The figure for one benefit section. */
export function Figure({ section }: { section: Section }) {
  return <FigureVariant section={section} variantId={CHOSEN[section]} />;
}

/** One of the 22 lazy-loaded figures, with the source reveal choreography. */
export function FigureVariant({
  section,
  variantId,
}: {
  section: Section;
  variantId: string;
}) {
  const variants = FIGURES[section];
  const variant =
    variants.find((v) => v.id === variantId) ?? variants[0]!;
  const Component = variant.component;
  return (
    <FigureReveal>
      <Suspense fallback={<div className="h-112 w-full" />}>
        <Component />
      </Suspense>
    </FigureReveal>
  );
}
