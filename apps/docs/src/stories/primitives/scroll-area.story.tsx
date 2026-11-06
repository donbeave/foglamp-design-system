/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { ScrollArea, ScrollBar } from "@tailrocks/framerock/ui/scroll-area";
import { defineStory } from "../../lib/story";

function ScrollAreaStory({
  itemCount = 8,
  height = 180,
}: {
  itemCount?: number;
  height?: number;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <ScrollArea style={{ height }} className="w-full max-w-sm rounded-md shadow-(--custom-shadow)">
        <div className="space-y-3 p-4">
          {Array.from({ length: Math.max(1, itemCount) }, (_, i) => (
            <div key={i} className="flex justify-between border-b pb-2 text-sm">
              <span>trace_{String(i + 1).padStart(3, "0")} · generation</span>
              <span className="text-muted-foreground">{120 + i * 17} ms</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/scroll-area",
  registryItem: "ui-scroll-area",
  displayName: "Scroll Area",
  Component: ScrollAreaStory,
  frame: { height: 280 },
  args: [
    { variant: "Default", initial: { itemCount: 8, height: 180 } },
    { variant: "Extended list", initial: { itemCount: 16, height: 200 } },
  ],
});
