/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Separator } from "@tailrocks/framerock/ui/separator";
import { defineStory } from "../../lib/story";

function SeparatorStory({
  orientation = "horizontal",
  label = "Trace metadata",
}: {
  orientation?: "horizontal" | "vertical";
  label?: string;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      {orientation === "vertical" ? (
        <div className="flex h-16 items-center gap-4 text-sm">
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">12 spans</p>
          </div>
          <Separator orientation="vertical" />
          <div>
            <p className="font-medium">Input tokens</p>
            <p className="text-xs text-muted-foreground">1,284</p>
          </div>
          <Separator orientation="vertical" />
          <div>
            <p className="font-medium">Output tokens</p>
            <p className="text-xs text-muted-foreground">392</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm space-y-4">
          <div>
            <h3 className="font-medium">{label}</h3>
            <p className="text-sm text-muted-foreground">12 spans · 1.42 s total</p>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex justify-between text-sm">
            <span>Input tokens</span>
            <span>1,284</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Output tokens</span>
            <span>392</span>
          </div>
        </div>
      )}
    </div>
  );
}

export const story = defineStory({
  id: "primitives/separator",
  registryItem: "ui-separator",
  displayName: "Separator",
  Component: SeparatorStory,
  args: [
    { variant: "Horizontal", initial: { orientation: "horizontal", label: "Trace metadata" } },
    { variant: "Vertical", initial: { orientation: "vertical", label: "Trace metadata" } },
  ],
});
