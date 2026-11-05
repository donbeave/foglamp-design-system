"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/packages/ui/src/components/collapsible.tsx; derived here under Apache-2.0.
 */
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
	);
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
	);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
