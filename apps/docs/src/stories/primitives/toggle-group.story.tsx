/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@tailrocks/framerock/ui/toggle-group";
import { defineStory } from "../../lib/story";

function ToggleGroupStory({
  defaultValue = "24h",
  variant = "outline",
}: {
  defaultValue?: "1h" | "24h" | "7d";
  variant?: "default" | "outline";
}) {
  const [period, setPeriod] = useState<string>(defaultValue);
  useEffect(() => {
    setPeriod(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid gap-3">
        <ToggleGroup
          variant={variant}
          value={[period]}
          onValueChange={(next) => {
            const v = Array.isArray(next) ? next[0] : next;
            if (typeof v === "string" && v) setPeriod(v);
          }}
          aria-label="Time period"
        >
          <ToggleGroupItem value="1h" aria-label="Last hour">1h</ToggleGroupItem>
          <ToggleGroupItem value="24h" aria-label="Last day">24h</ToggleGroupItem>
          <ToggleGroupItem value="7d" aria-label="Last week">7d</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-xs text-muted-foreground">Showing activity for {period}.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/toggle-group",
  registryItem: "ui-toggle-group",
  displayName: "Toggle Group",
  Component: ToggleGroupStory,
  args: [
    { variant: "Outline", initial: { defaultValue: "24h", variant: "outline" } },
    { variant: "Default", initial: { defaultValue: "7d", variant: "default" } },
  ],
});
