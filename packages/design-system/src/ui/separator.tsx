"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/packages/ui/src/components/separator.tsx; derived here under Apache-2.0.
 */
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@foglamp/design-system/lib/utils";

function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border/70 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
