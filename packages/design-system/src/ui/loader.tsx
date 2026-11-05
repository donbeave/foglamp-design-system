/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/packages/ui/src/components/loader.tsx; derived here under Apache-2.0.
 */
import { cn } from "@foglamp/design-system/lib/utils";

// prompt-kit "text-shimmer" loader (https://www.prompt-kit.com/docs/loader):
// a label whose color sweeps left→right via an animated background-clip gradient.
// Relies on the `shimmer` keyframes + `--animate-shimmer` registered in
// styles/globals.css.

export type TextShimmerLoaderProps = {
	text?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const textSizes = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-base",
} as const;

export function TextShimmerLoader({
	text = "Thinking",
	size = "md",
	className,
}: TextShimmerLoaderProps) {
	return (
		<div
			role="status"
			aria-label={text}
			className={cn(
				"bg-[linear-gradient(to_right,var(--muted-foreground)_40%,var(--foreground)_60%,var(--muted-foreground)_80%)]",
				"bg-clip-text font-normal text-transparent bg-size-[200%_auto]",
				"animate-shimmer",
				textSizes[size],
				className,
			)}
		>
			{text}
		</div>
	);
}
