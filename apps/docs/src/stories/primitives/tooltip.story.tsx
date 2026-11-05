/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@tailrocks/framerock/ui/tooltip";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function TooltipStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><TooltipProvider><div className="flex items-center gap-2"><span className="text-sm">Sampling rate</span><Tooltip><TooltipTrigger aria-label="About sampling">ⓘ</TooltipTrigger><TooltipContent>Percentage of requests captured for analysis.</TooltipContent></Tooltip></div></TooltipProvider></div>;
}

export const story = defineStory({ id: "primitives/tooltip", registryItem: "ui-tooltip", displayName: "Tooltip", Component: TooltipStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
