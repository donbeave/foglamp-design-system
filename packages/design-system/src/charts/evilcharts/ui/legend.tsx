/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/evilcharts/ui/legend.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/evilcharts/ui/legend.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import {
	getColorsCount,
	getPayloadConfigFromPayload,
	useChart,
} from "./chart";
import { cn } from "../../../lib/utils";
import type * as React from "react";
import * as RechartsPrimitive from "recharts";

type ChartLegendVariant =
	| "square"
	| "circle"
	| "circle-outline"
	| "rounded-square"
	| "rounded-square-outline"
	| "vertical-bar"
	| "horizontal-bar";

function ChartLegendContent({
	className,
	hideIcon = false,
	nameKey,
	payload,
	verticalAlign,
	align = "right",
	selected = null,
	onSelectChange,
	isClickable,
	variant = "rounded-square",
}: React.ComponentProps<"div"> & {
	hideIcon?: boolean;
	nameKey?: string;
	selected?: string | null;
	isClickable?: boolean;
	onSelectChange?: (selected: string | null) => void;
	variant?: ChartLegendVariant;
} & RechartsPrimitive.DefaultLegendContentProps) {
	const { config } = useChart();

	if (!payload?.length) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-x-4 gap-y-1.5 select-none",
				align === "left" && "justify-start",
				align === "center" && "justify-center",
				align === "right" && "justify-end",
				verticalAlign === "top" ? "pb-4" : "pt-4",
				className,
			)}
		>
			{payload
				.filter((item) => item.type !== "none")
				.map((item) => {
					// For pie charts, item.value contains the sector name (e.g., "chrome")
					// For radial charts, the name is in item.payload[nameKey]
					// For other charts, item.dataKey contains the series name (e.g., "desktop")
					const payloadName =
						nameKey && item.payload
							? (item.payload as Record<string, unknown>)[nameKey]
							: undefined;
					const key = `${payloadName ?? item.value ?? item.dataKey ?? "value"}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);
					const isSelected = selected === null || selected === key;

					// Get colors count for this item to determine gradient vs solid
					const colorsCount = itemConfig ? getColorsCount(itemConfig) : 1;

					return (
						<div
							key={key}
							className={cn(
								"[&>svg]:text-muted-foreground flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3",
								!isSelected && "opacity-30",
								isClickable && "cursor-pointer",
							)}
							onClick={() => {
								if (!isClickable) return;

								onSelectChange?.(selected === key ? null : key);
							}}
						>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<LegendIndicator
									variant={variant}
									dataKey={key}
									colorsCount={colorsCount}
								/>
							)}
							{itemConfig?.label}
						</div>
					);
				})}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Legend indicator — each variant gets its own branch so future variants
// can diverge freely in markup & style.
// ---------------------------------------------------------------------------

function LegendIndicator({
	variant,
	dataKey,
	colorsCount,
}: {
	variant: ChartLegendVariant;
	dataKey: string;
	colorsCount: number;
}) {
	const fillStyle = getLegendFillStyle(dataKey, colorsCount);
	const outlineStyle = getLegendOutlineStyle(dataKey, colorsCount);

	switch (variant) {
		case "square":
			return <div className="h-2 w-2 shrink-0" style={fillStyle} />;

		case "circle":
			return (
				<div className="h-2 w-2 shrink-0 rounded-full" style={fillStyle} />
			);

		case "circle-outline":
			return (
				<div
					className="h-2.5 w-2.5 shrink-0 rounded-full p-[1.5px]"
					style={outlineStyle}
				/>
			);

		case "vertical-bar":
			return (
				<div className="h-3 w-1 shrink-0 rounded-[2px]" style={fillStyle} />
			);

		case "horizontal-bar":
			return (
				<div className="h-1 w-3 shrink-0 rounded-[2px]" style={fillStyle} />
			);

		case "rounded-square-outline":
			return (
				<div
					className="h-2.5 w-2.5 shrink-0 rounded-[3px] p-[1.5px]"
					style={outlineStyle}
				/>
			);

		case "rounded-square":
		default:
			return (
				<div className="h-2 w-2 shrink-0 rounded-[2px]" style={fillStyle} />
			);
	}
}

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

/** Solid fill / gradient background for filled variants. */
function getLegendFillStyle(
	dataKey: string,
	colorsCount: number,
): React.CSSProperties {
	if (colorsCount <= 1) {
		return { backgroundColor: `var(--color-${dataKey}-0)` };
	}

	const stops = Array.from({ length: colorsCount }, (_, i) => {
		const offset = (i / (colorsCount - 1)) * 100;
		return `var(--color-${dataKey}-${i}) ${offset}%`;
	}).join(", ");

	return { background: `linear-gradient(to right, ${stops})` };
}

/**
 * Outline style for stroke variants.
 * Uses background + mask-composite to punch out the center, leaving only the
 * "border" visible. Works with both solid colors and gradients, and respects
 * border-radius — unlike plain `border-color`.
 */
function getLegendOutlineStyle(
	dataKey: string,
	colorsCount: number,
): React.CSSProperties {
	const maskStyle: React.CSSProperties = {
		WebkitMask:
			"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		WebkitMaskComposite: "xor",
		mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		maskComposite: "exclude",
	};

	if (colorsCount <= 1) {
		return {
			backgroundColor: `var(--color-${dataKey}-0)`,
			...maskStyle,
		};
	}

	const stops = Array.from({ length: colorsCount }, (_, i) => {
		const offset = (i / (colorsCount - 1)) * 100;
		return `var(--color-${dataKey}-${i}) ${offset}%`;
	}).join(", ");

	return {
		background: `linear-gradient(to right, ${stops})`,
		...maskStyle,
	};
}

const ChartLegend = RechartsPrimitive.Legend;

export { ChartLegend, ChartLegendContent, type ChartLegendVariant };
