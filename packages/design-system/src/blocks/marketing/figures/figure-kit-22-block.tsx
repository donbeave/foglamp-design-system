/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
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
