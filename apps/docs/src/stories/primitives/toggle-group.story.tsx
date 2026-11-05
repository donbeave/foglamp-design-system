/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@foglamp/design-system/ui/toggle-group";
import { defineStory } from "../../lib/story";

type Args = { period: '24h' };
function ToggleGroupStory({ args }: { args: Args }) {
  const [period, setPeriod] = useState("24h");
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid gap-3"><ToggleGroup defaultValue={["24h"]} aria-label="Time period"><ToggleGroupItem value="1h" aria-label="Last hour">1h</ToggleGroupItem><ToggleGroupItem value="24h" aria-label="Last day">24h</ToggleGroupItem><ToggleGroupItem value="7d" aria-label="Last week">7d</ToggleGroupItem></ToggleGroup><p className="text-xs text-muted-foreground">Showing activity for {period}.</p></div></div>;
}

export const story = defineStory({ id: "primitives/toggle-group", registryItem: "ui-toggle-group", displayName: "Toggle Group", Component: ToggleGroupStory, args: [{ variant: "Default", initial: { args: { period: '24h' } } }] });
