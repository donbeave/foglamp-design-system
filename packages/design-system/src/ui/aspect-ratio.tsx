/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/packages/ui/src/components/aspect-ratio.tsx; derived here under Apache-2.0.
 */
import { cn } from "@foglamp/design-system/lib/utils";

function AspectRatio({
	ratio,
	className,
	...props
}: React.ComponentProps<"div"> & { ratio: number }) {
	return (
		<div
			data-slot="aspect-ratio"
			style={
				{
					"--ratio": ratio,
				} as React.CSSProperties
			}
			className={cn("relative aspect-(--ratio)", className)}
			{...props}
		/>
	);
}

export { AspectRatio };
