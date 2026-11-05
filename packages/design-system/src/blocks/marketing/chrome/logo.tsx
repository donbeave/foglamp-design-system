/**
 * Original design by Gustavo Fior (@gustavo-fior), co-founder Abdul Haidar, and Foglamp Labs.
 * Extracted AS-IS from foglamp-labs/foglamp: apps/web/src/components/marketing/logo.tsx.
 * Licensed under Apache-2.0.
 */
import { cn } from "../../../lib/utils";

import { BrandMark } from "./brand-mark";

/**
 * Foglamp logo lockup — the three-circle brand mark next to the "Foglamp"
 * wordmark, set in Host Grotesk (the marketing display face, `font-display`).
 * Used in the marketing navbar and footer.
 */
export function Logo({ className }: { className?: string }) {
	return (
		<span className={cn("flex items-center gap-2", className)}>
			<BrandMark className="h-3.5 w-auto" />
			<span className="font-display text-lg font-semibold tracking-tight select-none">
				Foglamp
			</span>
		</span>
	);
}
