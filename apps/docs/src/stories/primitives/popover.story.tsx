/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "@tailrocks/framerock/ui/popover";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function PopoverStory({
  title = "Trace filters",
  align = "center",
}: {
  title?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <Popover>
        <PopoverTrigger className="rounded-md px-3 py-2 shadow-(--custom-shadow)">Filter traces</PopoverTrigger>
        <PopoverContent align={align} className="w-72">
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>Refine the current trace list.</PopoverDescription>
          </PopoverHeader>
          <div className="mt-4 grid gap-3">
            <Label>Service</Label>
            <input className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="checkout-api" />
            <Label>Minimum duration</Label>
            <input type="number" className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="500" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/popover",
  registryItem: "ui-popover",
  displayName: "Popover",
  Component: PopoverStory,
  frame: { height: 320 },
  args: [
    { variant: "Center", initial: { title: "Trace filters", align: "center" } },
    { variant: "Start aligned", initial: { title: "Span attributes", align: "start" } },
  ],
});
