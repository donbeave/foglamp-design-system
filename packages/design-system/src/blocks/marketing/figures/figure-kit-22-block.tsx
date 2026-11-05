/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Composed AS-IS from foglamp-labs/foglamp landing figures and figure-picker modules.
 * Licensed under Apache-2.0.
 */
"use client";

import { FigureVariant } from "./figure-picker";
import type { Section } from "./figures";

export type FigureKit22BlockProps = {
	/** Choose one of the source's 15 cost, 6 trace, or 1 quality figures. */
	section?: Section;
	/** Figure ID within the selected section; defaults to the source hero choice. */
	variantId?: string;
};

const DEFAULT_VARIANT: Record<Section, string> = {
	costs: "chart",
	traces: "xray",
	quality: "review",
};

/**
 * Render any of the 22 original landing figures while retaining its lazy
 * loading, reveal timing, and full source SVG/animation implementation.
 */
export function FigureKit22Block({
	section = "costs",
	variantId = DEFAULT_VARIANT[section],
}: FigureKit22BlockProps) {
	return <FigureVariant section={section} variantId={variantId} />;
}
