/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/demo/tabs/evals-tab.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/demo/tabs/evals-tab.tsx
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
 * foglamp-labs/foglamp: apps/web/src/components/marketing/demo/tabs/evals-tab.tsx.
 * Licensed under Apache-2.0.
 */

import { Button } from "@tailrocks/framerock/ui/button";
import { Switch } from "@tailrocks/framerock/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@tailrocks/framerock/ui/table";
import { TooltipProvider } from "@tailrocks/framerock/ui/tooltip";
import { cn } from "@tailrocks/framerock/lib/utils";
import {
	IconAffiliate,
	IconAlertTriangle,
	IconCircleCheck,
	IconFileCode,
	IconForbid,
	IconKey,
	IconListCheck,
	IconPlus,
	IconProgress,
	IconSparkles,
	IconStack2,
	IconTool,
	IconTrashFilled,
} from "@tabler/icons-react";
import { useState } from "react";

import { FAMILY_ICON, presetMeta } from "@tailrocks/framerock/widgets/leaf/preset-meta";
import {
	ClearFiltersButton,
	FilterSelect,
	SearchInput,
	SortableHead,
	Toolbar,
	sortRows,
	useTableSort,
} from "@tailrocks/framerock/widgets/data-table";
import { HeatCell } from "@tailrocks/framerock/widgets/heat-cell";
import { formatCostFixed, formatPercent } from "@tailrocks/framerock/lib/format";

import { DemoListHeader, DemoRange } from "../demo-chrome";
import { useDemo } from "../demo-context";
import { EVALS, type EvalRow, quintiles } from "../mock-data";

const SPEND_QUANTILES = quintiles(EVALS.map((e) => e.spend));

type EvalSortKey = "name" | "passRate" | "avgScore" | "spend";

export function EvalsTab() {
	const { openDetail } = useDemo();

	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sourceFilter, setSourceFilter] = useState("");
	const [enabledById, setEnabledById] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(EVALS.map((e) => [e.id, e.enabled])),
	);
	const { sort, toggle } = useTableSort<EvalSortKey>();

	const q = search.trim().toLowerCase();
	const filtered = EVALS.filter(
		(e) =>
			(!q ||
				e.name.toLowerCase().includes(q) ||
				e.presetId.toLowerCase().includes(q)) &&
			(!statusFilter || e.status === statusFilter) &&
			(!sourceFilter ||
				(sourceFilter === "llm" ? e.type === "llm-judge" : e.type === "code")),
	);
	const visible = sortRows<EvalRow, EvalSortKey>(filtered, sort, {
		name: (e) => e.name,
		passRate: (e) => e.passRate,
		avgScore: (e) => e.avgScore,
		spend: (e) => e.spend,
	});

	return (
		<>
			<DemoListHeader href="/evals" title="Evals" />
			<div className="flex flex-col gap-4 mt-1">
				{/* Like the app: the range picker and the "New eval" button trail
				    the filters on the toolbar row, not the page header. */}
				<Toolbar
					trailing={
						<>
							<DemoRange />
							<Button variant="secondary">
								<IconPlus strokeWidth={2.4} />
								New eval
							</Button>
						</>
					}
				>
					<SearchInput
						value={search}
						onChange={setSearch}
						placeholder="Search evals…"
					/>
					<FilterSelect
						value={statusFilter}
						onChange={setStatusFilter}
						allLabel="Any status"
						icon={IconProgress}
						options={[
							{ value: "ok", label: "OK", icon: IconCircleCheck },
							{ value: "error", label: "Error", icon: IconForbid },
							{ value: "paused_no_key", label: "Needs key", icon: IconKey },
						]}
					/>
					<FilterSelect
						value={sourceFilter}
						onChange={setSourceFilter}
						allLabel="Any check"
						icon={IconListCheck}
						options={[
							{ value: "code", label: "Code", icon: IconFileCode },
							{ value: "llm", label: "LLM judge", icon: IconSparkles },
						]}
					/>
					<ClearFiltersButton
						show={!!(search || statusFilter || sourceFilter)}
						onClick={() => {
							setSearch("");
							setStatusFilter("");
							setSourceFilter("");
						}}
					/>
				</Toolbar>

				<TooltipProvider delay={150}>
					<Table className="table-fixed min-w-[64rem] -mt-2">
						<TableHeader>
							<TableRow>
								<SortableHead
									className="w-40 truncate"
									sortKey="name"
									sort={sort}
									onSort={toggle}
								>
									Name
								</SortableHead>
								<TableHead className="w-52">Scope</TableHead>
								<SortableHead
									sortKey="passRate"
									sort={sort}
									onSort={toggle}
									align="right"
									className="w-28"
								>
									Pass rate
								</SortableHead>
								<SortableHead
									sortKey="avgScore"
									sort={sort}
									onSort={toggle}
									align="right"
									className="w-24"
								>
									Avg score
								</SortableHead>
								<SortableHead
									sortKey="spend"
									sort={sort}
									onSort={toggle}
									align="right"
									className="w-28"
								>
									Spend
								</SortableHead>
								<TableHead className="w-24" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{visible.map((r) => {
								const { icon: CheckIcon, family } = presetMeta(r.presetId);
								// Trace evals score the whole run; span evals score every
								// tool or LLM call individually (mirrors the app's targets).
								const target =
									r.level === "trace"
										? { icon: IconAffiliate, label: "Whole trace" }
										: r.spanType === "llm"
											? { icon: IconStack2, label: "LLM calls" }
											: { icon: IconTool, label: "Tool calls" };
								const TargetIcon = target.icon;
								return (
									<TableRow
										key={r.id}
										interactive
										onClick={() => openDetail({ type: "eval", id: r.id })}
									>
										<TableCell className="h-16">
											<div className="flex min-w-0 flex-col gap-1">
												<div className="flex min-w-0 items-center gap-2">
													<span className="truncate text-[14px]">{r.name}</span>
												{(r.status === "error" ||
													r.status === "paused_no_key") && (
													<span
														title={
															r.status === "paused_no_key"
																? "Needs an API key"
																: "Erroring"
														}
														className="flex shrink-0 items-center font-sans text-sm text-red-600 dark:text-red-400"
													>
														<IconAlertTriangle className="size-3.5 fill-current/20" />
													</span>
												)}
												</div>
												<div
													className={cn(
														"flex min-w-0 items-center gap-1 text-xs",
														FAMILY_ICON[family]
													)}
												>
													<CheckIcon className="size-3 shrink-0" />
													<span className="truncate">{r.presetName}</span>
												</div>
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">
											<span className="flex min-w-0 items-center gap-1.5">
												<TargetIcon className="size-3.5 shrink-0" />
												{/* Level, agent filter, and the sample rate in one line. */}
												<span className="truncate">
													{target.label}
													{r.agentName ? ` · ${r.agentName}` : ""}
													<span className="tabular-nums">{` · ${r.sample}%`}</span>
												</span>
											</span>
										</TableCell>
										<TableCell className="text-right tabular-nums font-medium">
											<span
												className={cn(
													r.passRate >= 0.9
														? "text-emerald-600 dark:text-emerald-400"
														: r.passRate < 0.5 &&
																"text-rose-600 dark:text-rose-400",
												)}
											>
												{formatPercent(r.passRate)}
											</span>
										</TableCell>
										<TableCell className="text-right tabular-nums text-muted-foreground">
											{r.avgScore.toFixed(2)}
										</TableCell>
										<HeatCell
											value={r.spend}
											thresholds={SPEND_QUANTILES}
											metric="spend"
											mutedWhenZero
										>
											{r.spend > 0 ? formatCostFixed(r.spend, 4) : "—"}
										</HeatCell>
										<TableCell
											onClick={(e) => e.stopPropagation()}
											align="center"
										>
											<div className="flex items-center gap-2 justify-center">
												<Switch
													size="sm"
													checked={enabledById[r.id]}
													onCheckedChange={(checked) =>
														setEnabledById((prev) => ({
															...prev,
															[r.id]: checked,
														}))
													}
												/>
												<Button
													size="icon-sm"
													variant="ghost-destructive"
													className="size-7"
												>
													<IconTrashFilled />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TooltipProvider>
			</div>
		</>
	);
}
