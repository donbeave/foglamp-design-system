/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/marketing/landing/figure-picker.tsx.
 * Licensed under Apache-2.0.
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
