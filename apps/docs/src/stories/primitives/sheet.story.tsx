/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@tailrocks/framerock/ui/sheet";
import { defineStory } from "../../lib/story";

function SheetStory({
  side = "right",
  title = "Span details",
}: {
  side?: "right" | "left" | "top" | "bottom";
  title?: string;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <Sheet>
        <SheetTrigger className="rounded-md bg-primary px-3 py-2 text-primary-foreground">Inspect trace</SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>POST /v1/chat/completions · 1.42 s</SheetDescription>
          </SheetHeader>
          <div className="grid gap-3 px-4 py-6 text-sm">
            <div className="flex justify-between">
              <span>Model</span>
              <span>gpt-4.1</span>
            </div>
            <div className="flex justify-between">
              <span>Input tokens</span>
              <span>1,284</span>
            </div>
            <div className="flex justify-between">
              <span>Cost</span>
              <span>$0.0042</span>
            </div>
          </div>
          <SheetFooter>
            <SheetClose className="rounded-md px-3 py-2 shadow-(--custom-shadow)">Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/sheet",
  registryItem: "ui-sheet",
  displayName: "Sheet",
  Component: SheetStory,
  frame: { height: 340 },
  args: [
    { variant: "Right", initial: { side: "right", title: "Span details" } },
    { variant: "Left", initial: { side: "left", title: "Navigation drawer" } },
    { variant: "Bottom", initial: { side: "bottom", title: "Raw payload" } },
  ],
});
