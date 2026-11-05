/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@tailrocks/framerock/ui/sheet";
import { defineStory } from "../../lib/story";

type Args = { side: 'right' };
function SheetStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><Sheet><SheetTrigger className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Inspect trace</SheetTrigger><SheetContent side={args.side}><SheetHeader><SheetTitle>Trace details</SheetTitle><SheetDescription>POST /v1/chat/completions · 1.42 s</SheetDescription></SheetHeader><div className="grid gap-3 py-6 text-sm"><div className="flex justify-between"><span>Model</span><span>gpt-4.1</span></div><div className="flex justify-between"><span>Input tokens</span><span>1,284</span></div><div className="flex justify-between"><span>Cost</span><span>$0.0042</span></div></div></SheetContent><SheetFooter><SheetClose className="rounded-md px-3 py-2 shadow-(--custom-shadow)">Close</SheetClose></SheetFooter></Sheet></div>;
}

export const story = defineStory({ id: "primitives/sheet", registryItem: "ui-sheet", displayName: "Sheet", Component: SheetStory, args: [{ variant: "Default", initial: { args: { side: 'right' } } }] });
