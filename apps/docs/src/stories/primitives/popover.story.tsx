/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "@foglamp/design-system/ui/popover";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function PopoverStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><Popover><PopoverTrigger className="rounded-md px-3 py-2 shadow-(--custom-shadow)">Filter traces</PopoverTrigger><PopoverContent className="w-72"><PopoverHeader><PopoverTitle>Trace filters</PopoverTitle><PopoverDescription>Refine the current trace list.</PopoverDescription></PopoverHeader><div className="mt-4 grid gap-3"><Label>Service</Label><input className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="checkout-api" /><Label>Minimum duration</Label><input type="number" className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="500" /></div></PopoverContent></Popover></div>;
}

export const story = defineStory({ id: "primitives/popover", registryItem: "ui-popover", displayName: "Popover", Component: PopoverStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
