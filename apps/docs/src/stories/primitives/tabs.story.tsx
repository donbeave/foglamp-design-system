/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@tailrocks/framerock/ui/tabs";
import { defineStory } from "../../lib/story";

function TabsStory({
  defaultTab = "overview",
  showBadges = true,
}: {
  defaultTab?: "overview" | "spans" | "evals";
  showBadges?: boolean;
}) {
  const [tab, setTab] = useState<string>(defaultTab);
  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <Tabs value={tab} onValueChange={(next) => setTab(String(next))} className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spans">Spans {showBadges ? "(12)" : ""}</TabsTrigger>
          <TabsTrigger value="evals">Evals {showBadges ? "(3)" : ""}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="rounded-md p-4 text-sm shadow-(--custom-shadow)">
          Request completed in 1.42 seconds across 12 spans.
        </TabsContent>
        <TabsContent value="spans" className="rounded-md p-4 font-mono text-xs shadow-(--custom-shadow)">
          chat.completions · 840 ms · 1,284 input tokens
        </TabsContent>
        <TabsContent value="evals" className="rounded-md p-4 text-sm shadow-(--custom-shadow)">
          Faithfulness 0.96 · Answer relevance 0.94
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/tabs",
  registryItem: "ui-tabs",
  displayName: "Tabs",
  Component: TabsStory,
  frame: { height: 280 },
  args: [
    { variant: "Overview", initial: { defaultTab: "overview", showBadges: true } },
    { variant: "Spans", initial: { defaultTab: "spans", showBadges: true } },
    { variant: "Evals", initial: { defaultTab: "evals", showBadges: false } },
  ],
});
