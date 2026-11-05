"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/stat.tsx; derived here under Apache-2.0.
 */
import { cn } from "../../lib/utils";

/** A two-line label/value stat, used in agent and workflow card grids.
 * `className` applies to the outer wrapper; `valueClassName` applies to the
 * value span (use for heat-tinted cost colors). */
export function Stat({
	label,
	value,
	emphasis,
	className,
	valueClassName,
}: {
	label: string;
	value: React.ReactNode;
	emphasis?: boolean;
	className?: string;
	valueClassName?: string;
}) {
	return (
		<div className={cn("flex flex-col gap-0.5", className)}>
			<span className="text-xs text-muted-foreground">{label}</span>
			<span
				className={cn(
					"tabular-nums",
					emphasis && "font-medium",
					valueClassName,
				)}
			>
				{value}
			</span>
		</div>
	);
}
