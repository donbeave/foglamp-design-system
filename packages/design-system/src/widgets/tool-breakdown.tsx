/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/tool-breakdown-card.tsx; decoupled from its query layer under Apache-2.0.
 */
"use client";

import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { IconTool } from "@tabler/icons-react";

import { formatCount, formatDuration, formatPercent } from "../lib/format";
import { cn } from "../lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";
import { Skeleton } from "../ui/skeleton";
import { ToolIcon } from "./leaf/tool-icon";
import { useDelayedLoading } from "../hooks/use-app-hooks";

export type ToolBreakdownItem = {
	toolName: string;
	callCount: number;
	errorCount: number;
	runCount: number;
	totalRunCount: number;
	latencyMs: {
		p50: number;
		p95: number;
		p99: number;
	};
};

/**
 * Which tools an agent leans on: per-tool call volume, error rate, and latency
 * quantiles over the window, most-called first. Pass data from any query,
 * server component, or fixture; no project or backend context is required.
 */
export function ToolBreakdownView({
	tools,
	isLoading = false,
	isUpdating = false,
	title = "Tools",
	className,
}: {
	tools: readonly ToolBreakdownItem[];
	isLoading?: boolean;
	isUpdating?: boolean;
	title?: string;
	className?: string;
}) {
	const skeleton = useDelayedLoading(isLoading);
	// Share bars are scaled to the most-called tool, like the overview's
	// breakdown cards scale to the top cost.
	const maxCalls = Math.max(1, ...tools.map((t) => t.callCount));

	return (
		<Card
			size="sm"
			className={cn("pb-0! group-data-[size=sm]/card:pb-0!", className)}
		>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="mt-1">
				{!isLoading && tools.length === 0 ? (
					<ToolEmptyState />
				) : (
					// One ScrollFade for both the skeleton and the loaded rows so the
					// fade never remounts when the data lands (mirrors the overview).
					<ScrollFade
						className="max-h-72 pr-1"
						containerClassName={cn(
							"transition-opacity",
							isUpdating
								? "opacity-50 delay-150 duration-300"
								: "duration-150",
						)}
					>
						{isLoading ? (
							<ToolRowsSkeleton skeleton={skeleton} />
						) : (
							<div className="divide-y divide-border/40 pb-6">
								{tools.map((t) => (
									<div
										key={t.toolName}
										className="flex items-center justify-between gap-6 px-0.5 py-3 first:pt-0 last:pb-0"
									>
										{/* Left: name + secondary metrics (mirrors BreakdownRow). */}
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-1.75">
												<ToolIcon
													name={t.toolName}
													className="size-3.25 shrink-0 text-blue-500"
												/>
												<span className="truncate text-sm font-medium">
													{t.toolName || "unnamed"}
												</span>
											</div>
											<div className="mt-1 text-xs tabular-nums text-muted-foreground/70">
												p50 {formatDuration(t.latencyMs.p50)} · p95{" "}
												{formatDuration(t.latencyMs.p95)} · p99{" "}
												{formatDuration(t.latencyMs.p99)}
												{t.errorCount > 0 && (
													<span className="text-red-500/80">
														{" "}
														· {formatPercent(t.errorCount / t.callCount)} err
													</span>
												)}
											</div>
										</div>
										{/* Right: call count + share-of-calls bar. */}
										<div className="flex shrink-0 flex-col items-end gap-1">
											<span className="text-sm tabular-nums">
												{formatCount(t.callCount)}
												{t.callCount === 1 ? " call" : " calls"}
											</span>
											{t.totalRunCount > 0 && (
												<span className="text-xs tabular-nums text-muted-foreground/70">
													{formatPercent(t.runCount / t.totalRunCount)} of runs
												</span>
											)}
											<div className="h-0.5 w-14 overflow-hidden rounded-full bg-muted-foreground/10">
												<div
													className="ml-auto h-full rounded-full bg-blue-500"
													style={{
														width: `${Math.max(2, (t.callCount / maxCalls) * 100)}%`,
													}}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</ScrollFade>
				)}
			</CardContent>
		</Card>
	);
}

/** The original EmptyState layout composed from the same UI primitives. */
function ToolEmptyState() {
	return (
		<Empty className="border border-dashed mb-12 h-full border-none">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconTool className="opacity-40 fill-current stroke-1" />
				</EmptyMedia>
				<EmptyContent>
					<EmptyTitle>No tool calls in this range</EmptyTitle>
					<EmptyDescription>
						Tool executions will show up here once they run.
					</EmptyDescription>
				</EmptyContent>
			</EmptyHeader>
		</Empty>
	);
}

/** Scroll viewport with the same live edge fades as the app's ScrollFade. */
function ScrollFade({
	children,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
}) {
	const viewport = useRef<HTMLDivElement>(null);
	const content = useRef<HTMLDivElement>(null);
	const [edges, setEdges] = useState({ top: false, bottom: false });
	const update = useCallback(() => {
		const el = viewport.current;
		if (!el) return;
		setEdges({
			top: el.scrollTop > 1,
			bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
		});
	}, []);
	useLayoutEffect(() => {
		update();
		const el = content.current;
		if (!el) return;
		const observer = new ResizeObserver(update);
		observer.observe(el);
		return () => observer.disconnect();
	}, [update]);
	return (
		<div className={cn("relative no-scrollbar", containerClassName)}>
			<div
				ref={viewport}
				onScroll={update}
				className={cn("overflow-y-auto no-scrollbar", className)}
			>
				<div ref={content}>{children}</div>
			</div>
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b to-transparent transition-opacity duration-150",
					"from-card",
					edges.top ? "opacity-100" : "opacity-0",
				)}
			/>
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t to-transparent transition-opacity duration-150",
					"from-card",
					edges.bottom ? "opacity-75" : "opacity-0",
				)}
			/>
		</div>
	);
}

/** Row-shaped placeholder matching the loaded tool rows. */
function ToolRowsSkeleton({
	rows = 4,
	skeleton,
}: {
	rows?: number;
	skeleton: boolean;
}) {
	return (
		<div
			className={cn("divide-y divide-border/40 pb-6", !skeleton && "invisible")}
		>
			{Array.from({ length: rows }).map((_, i) => (
				<div
					key={i}
					className="flex items-center justify-between gap-6 px-0.5 py-3 first:pt-0 last:pb-0"
				>
					<div className="min-w-0 flex-1">
						<div className="flex h-5 items-center gap-1.75">
							<Skeleton className="size-3.25 shrink-0 rounded-full squircle:rounded-full" />
							<Skeleton className="h-3.5 w-28" />
						</div>
						<div className="mt-1 flex h-4 items-center">
							<Skeleton className="h-3 w-40" />
						</div>
					</div>
					<div className="flex shrink-0 flex-col items-end gap-1">
						<div className="flex h-5 items-center">
							<Skeleton className="h-3.5 w-14" />
						</div>
						<div className="flex h-4 items-center">
							<Skeleton className="h-3 w-16" />
						</div>
						<Skeleton className="h-0.5 w-14" />
					</div>
				</div>
			))}
		</div>
	);
}
