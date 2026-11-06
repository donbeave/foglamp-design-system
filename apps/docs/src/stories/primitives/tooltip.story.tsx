/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@tailrocks/framerock/ui/tooltip";
import { defineStory } from "../../lib/story";

function TooltipStory({
  content = "Percentage of requests captured for analysis.",
  side = "top",
}: {
  content?: string;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sampling rate</span>
          <Tooltip>
            <TooltipTrigger className="inline-flex size-6 items-center justify-center rounded-full border border-border/60 text-xs" aria-label="About sampling">
              ⓘ
            </TooltipTrigger>
            <TooltipContent side={side}>{content}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/tooltip",
  registryItem: "ui-tooltip",
  displayName: "Tooltip",
  Component: TooltipStory,
  args: [
    { variant: "Top", initial: { content: "Percentage of requests captured for analysis.", side: "top" } },
    { variant: "Right", initial: { content: "Applies to incoming production traces.", side: "right" } },
  ],
});
