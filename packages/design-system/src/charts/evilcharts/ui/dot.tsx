/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/evilcharts/ui/dot.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/evilcharts/ui/dot.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { cn } from "../../../lib/utils";
import * as React from "react";

export type DotVariant = "default" | "border" | "colored-border";

type ChartDotProps = {
	cx?: number;
	cy?: number;
	dataKey: string;
	chartId: string;
	className?: string;
	fillOpacity?: number;
	type?: DotVariant;
	/** Optional SVG <mask> id — lets the dot share an area's intro reveal wipe. */
	maskId?: string;
};

const ChartDot = React.memo(function ChartDot({
	cx,
	cy,
	dataKey,
	chartId,
	className,
	fillOpacity = 1,
	type = "default",
	maskId,
}: ChartDotProps) {
	const dotId = React.useId().replace(/:/g, "");
	const gradientUrl = `url(#${chartId}-colors-${String(dataKey)})`;

	if (cx === undefined || cy === undefined) return null;

	switch (type) {
		case "border":
			return (
				<PrimaryBorderDot
					cx={cx}
					cy={cy}
					dotId={dotId}
					fillOpacity={fillOpacity}
					gradientUrl={gradientUrl}
					className={className}
					maskId={maskId}
				/>
			);
		case "colored-border":
			return (
				<ColoredBorderDot
					cx={cx}
					cy={cy}
					dotId={dotId}
					fillOpacity={fillOpacity}
					gradientUrl={gradientUrl}
					className={className}
					maskId={maskId}
				/>
			);
		default:
			return (
				<DefaultDot
					cx={cx}
					cy={cy}
					dotId={dotId}
					fillOpacity={fillOpacity}
					gradientUrl={gradientUrl}
					className={className}
					maskId={maskId}
				/>
			);
	}
});

type DotVariantProps = {
	cx: number;
	cy: number;
	dotId: string;
	fillOpacity: number;
	gradientUrl: string;
	className?: string;
	maskId?: string;
};

const DefaultDot = React.memo(
	({
		cx,
		cy,
		dotId,
		fillOpacity,
		gradientUrl,
		className,
		maskId,
	}: DotVariantProps) => {
		const r = 3;
		return (
			<g className={className} mask={maskId ? `url(#${maskId})` : undefined}>
				<defs>
					<clipPath id={`dot-clip-${dotId}`}>
						<circle cx={cx} cy={cy} r={r} />
					</clipPath>
				</defs>
				{/* Full-width gradient rectangle clipped to dot shape */}
				<rect
					x="0"
					y={cy - r}
					width="100%"
					height={r * 2}
					fill={gradientUrl}
					fillOpacity={fillOpacity}
					clipPath={`url(#dot-clip-${dotId})`}
				/>
			</g>
		);
	},
);

DefaultDot.displayName = "DefaultDot";

const PrimaryBorderDot = React.memo(
	({
		cx,
		cy,
		dotId,
		fillOpacity,
		gradientUrl,
		className,
		maskId,
	}: DotVariantProps) => {
		const r = 6;
		const strokeWidth = 5;
		return (
			<g
				className={cn(className, "text-background")}
				mask={maskId ? `url(#${maskId})` : undefined}
			>
				<defs>
					<clipPath id={`dot-clip-${dotId}`}>
						<circle cx={cx} cy={cy} r={r} />
					</clipPath>
				</defs>
				{/* Background stroke (border) */}
				<circle cx={cx} cy={cy} r={r} fill="currentColor" />
				{/* Inner gradient circle clipped */}
				<rect
					x="0"
					y={cy - (r - strokeWidth / 2)}
					width="100%"
					height={(r - strokeWidth / 2) * 2}
					fill={gradientUrl}
					fillOpacity={fillOpacity}
					clipPath={`url(#dot-clip-inner-${dotId})`}
				/>
				<defs>
					<clipPath id={`dot-clip-inner-${dotId}`}>
						<circle cx={cx} cy={cy} r={r - strokeWidth / 2} />
					</clipPath>
				</defs>
			</g>
		);
	},
);

PrimaryBorderDot.displayName = "PrimaryBorderDot";

const ColoredBorderDot = React.memo(
	({
		cx,
		cy,
		dotId,
		fillOpacity,
		gradientUrl,
		className,
		maskId,
	}: DotVariantProps) => {
		const r = 3;
		const strokeWidth = 1;
		return (
			<g
				className={cn(className, "text-background")}
				mask={maskId ? `url(#${maskId})` : undefined}
			>
				<defs>
					<clipPath id={`dot-clip-${dotId}`}>
						<circle cx={cx} cy={cy} r={r + strokeWidth / 2} />
					</clipPath>
				</defs>
				{/* Gradient stroke (border) via clipped rect */}
				<rect
					x="0"
					y={cy - r - strokeWidth / 2}
					width="100%"
					height={(r + strokeWidth / 2) * 2}
					fill={gradientUrl}
					fillOpacity={fillOpacity}
					clipPath={`url(#dot-clip-${dotId})`}
				/>
				{/* Inner solid fill */}
				<circle cx={cx} cy={cy} r={r - strokeWidth / 2} fill="currentColor" />
			</g>
		);
	},
);

ColoredBorderDot.displayName = "ColoredBorderDot";

export { ChartDot };
