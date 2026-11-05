/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/packages/ui/src/components/skeleton.tsx; derived here under Apache-2.0.
 */
import { cn } from "@foglamp/design-system/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"animate-pulse rounded-md squircle:rounded-2xl corner-squircle bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
