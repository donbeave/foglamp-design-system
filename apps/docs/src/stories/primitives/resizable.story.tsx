/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@tailrocks/framerock/ui/resizable";
import { defineStory } from "../../lib/story";

function ResizableStory({
  direction = "horizontal",
  withHandle = true,
}: {
  direction?: "horizontal" | "vertical";
  withHandle?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <ResizablePanelGroup orientation={direction} className="min-h-48 w-full max-w-xl rounded-lg shadow-(--custom-shadow)">
        <ResizablePanel defaultSize={36} minSize={25}>
          <div className="h-full p-4">
            <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Trace list</p>
            <div className="rounded-md bg-muted p-3 text-sm">POST /checkout</div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle} />
        <ResizablePanel defaultSize={64}>
          <div className="h-full p-4">
            <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Span details</p>
            <p className="text-sm">payment.authorize</p>
            <p className="mt-2 text-xs text-muted-foreground">Duration · 182 ms</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/resizable",
  registryItem: "ui-resizable",
  displayName: "Resizable",
  Component: ResizableStory,
  frame: { height: 300 },
  args: [
    { variant: "Horizontal", initial: { direction: "horizontal", withHandle: true } },
    { variant: "Vertical", initial: { direction: "vertical", withHandle: true } },
  ],
});
