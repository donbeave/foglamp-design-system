/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/cost-breakdown-card.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/cost-breakdown-card.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { useEffect, useMemo, useState } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	EvilBarChart,
	Bar,
	Grid,
	Tooltip,
	XAxis,
	YAxis,
} from "../charts/evilcharts/charts/bar-chart";
import type { ChartConfig } from "../charts/evilcharts/ui/chart";
import {
	ChartLegend,
	formatBucketFull,
	makeBucketLabel,
	makeEdgeTick,
	themed,
	thinTicks,
	useFrozen,
} from "./trend-charts";
import type { ZoomSelectHandler } from "../charts/evilcharts/ui/zoom";
import { formatCost } from "../lib/format";
import type { RangeValue } from "../lib/range";
import { cn } from "../lib/utils";

// Price dimensions in stack order (bottom → top), grouped into two color
// families: the input side in oranges (fresh input, cached input, cache
// write) and the output side in blues (output, reasoning). Colors are fixed
// per category — a range with no cache writes must not repaint the survivors.
// Note: providers only cache input tokens, so there is no "cached output"
// dimension — cache read cost IS the cached share of input.
const CATEGORIES = [
	{ key: "input", label: "Input", color: "#F97316" },
	{ key: "cacheRead", label: "Cached input", color: "#FDBA74" },
	{ key: "cacheWrite", label: "Cache write", color: "#C2410C" },
	{ key: "output", label: "Output", color: "#0090FD" },
	{ key: "reasoning", label: "Reasoning", color: "#93C5FD" },
	{ key: "other", label: "Other", color: "var(--muted-foreground)" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

export type CostBreakdownRow = {
	bucket: string;
	inputCost: number;
	outputCost: number;
	cacheReadCost: number;
	cacheWriteCost: number;
	reasoningCost: number;
	otherCost: number;
};

// Y-axis currency capped at 3 decimals so labels stay short (e.g. "$0.026").
const costAxisUsd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 3,
});

/**
 * Cost over time stacked by price dimension (input / output / cache read /
 * cache write / reasoning / other). Pass rows and their range from any query,
 * server component, or fixture; `isUpdating` holds the last complete view
 * while replacement rows are loading.
 */
export function CostBreakdownView({
	data,
	range,
	isLoading = false,
	isUpdating = false,
	title = "Cost breakdown",
	className,
	syncId,
	onZoomSelect,
	onZoomReset,
}: {
	data: readonly CostBreakdownRow[];
	range: RangeValue;
	isLoading?: boolean;
	isUpdating?: boolean;
	title?: string;
	className?: string;
	/** Recharts sync group — pass the host page's id to share its crosshair. */
	syncId?: string;
	onZoomSelect?: ZoomSelectHandler;
	onZoomReset?: () => void;
}) {
	const from = range.from.toISOString();
	const to = range.to.toISOString();
	const [selected, setSelected] = useState<string | null>(null);
	// The visible category set can change with the range, so a stale selection
	// could point at a series that no longer renders.
	useEffect(() => setSelected(null), [from, to]);

	// While a range change refetches, hold both the rows and the window they were
	// fetched for. Ticks and labels then remain mutually consistent until the
	// parent marks the refreshed data current.
	const chartView = useFrozen(
		{
			rows: data,
			windowMs: range.to.getTime() - range.from.getTime(),
		},
		isUpdating,
	);
	const bucketLabel = useMemo(
		() => makeBucketLabel(chartView.windowMs),
		[chartView.windowMs],
	);
	const edgeTick = useMemo(() => makeEdgeTick(bucketLabel), [bucketLabel]);

	const { chartData, config, keys, ticks, empty } = useMemo(() => {
		const rows = chartView.rows;
		const totals: Record<CategoryKey, number> = {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			reasoning: 0,
			other: 0,
		};
		const chartData = rows.map((r) => {
			const row: Record<string, string | number> = { bucket: r.bucket };
			row.input = r.inputCost;
			row.output = r.outputCost;
			row.cacheRead = r.cacheReadCost;
			row.cacheWrite = r.cacheWriteCost;
			row.reasoning = r.reasoningCost;
			row.other = r.otherCost;
			for (const c of CATEGORIES) totals[c.key] += Number(row[c.key]) || 0;
			return row;
		});
		// Only categories that actually cost something get a series — reasoning
		// and "other" are usually all-zero and would just clutter the legend.
		const active = CATEGORIES.filter((c) => totals[c.key] > 0);
		const config: ChartConfig = {};
		for (const c of active)
			config[c.key] = { label: c.label, colors: themed(c.color) };
		return {
			chartData,
			config,
			keys: active.map((c) => c.key),
			ticks: thinTicks(
				rows.map((r) => r.bucket),
				bucketLabel,
			),
			empty: !isLoading && active.length === 0,
		};
	}, [chartView, isLoading, bucketLabel]);

	// Dash-hatch the trailing bar only when the last bucket is still filling.
	const lastBucketLive = useMemo(() => {
		if (chartData.length < 2) return false;
		const ms = (b: string) => new Date(`${b.replace(" ", "T")}Z`).getTime();
		const last = ms(String(chartData[chartData.length - 1]!.bucket));
		const prev = ms(String(chartData[chartData.length - 2]!.bucket));
		if (Number.isNaN(last) || Number.isNaN(prev)) return false;
		return Date.now() < last + (last - prev);
	}, [chartData]);

	return (
		<Card size="sm" className={className}>
			<CardHeader className="flex flex-row items-center justify-between gap-4">
				<CardTitle>{title}</CardTitle>
				{keys.length > 0 && (
					<ChartLegend
						config={config}
						selected={selected}
						onSelect={setSelected}
					/>
				)}
			</CardHeader>
			<CardContent className="mt-3">
				<div className="relative">
					<EvilBarChart
						config={config}
						data={chartData}
						stackType="stacked"
						xDataKey="bucket"
						syncId={syncId}
						onZoomSelect={empty ? undefined : onZoomSelect}
						onZoomReset={onZoomReset}
						selectedDataKey={selected}
						onSelectionChange={setSelected}
						isLoading={isLoading}
						isUpdating={!empty && isUpdating}
						className={cn("h-[260px] w-full", empty && "opacity-40")}
						chartProps={{
							margin: { top: 5, right: 5, bottom: 5, left: 2 },
							barCategoryGap: "40%",
						}}
					>
						<Grid />
						<XAxis
							dataKey="bucket"
							ticks={ticks}
							tickFormatter={bucketLabel}
							interval={0}
							tick={edgeTick}
						/>
						<YAxis
							tickFormatter={(v) => costAxisUsd.format(Number(v))}
						/>
						<Tooltip
							labelFormatter={(v) => formatBucketFull(String(v))}
							valueFormatter={(v) => formatCost(Number(v))}
							reverse
						/>
						{keys.map((k) => (
							<Bar key={k} dataKey={k} isClickable bufferBar={lastBucketLive} />
						))}
					</EvilBarChart>
					{empty && (
						<p className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm">
							No cost recorded in this range.
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export const CostBreakdownCard = CostBreakdownView;
