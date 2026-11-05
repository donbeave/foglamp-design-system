/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@tailrocks/framerock/ui/tabs";
import { defineStory } from "../../lib/story";

type Args = { variant: 'overview' };
function TabsStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><Tabs defaultValue="overview" className="w-full max-w-md"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="prompt">Prompt</TabsTrigger><TabsTrigger value="response">Response</TabsTrigger></TabsList><TabsContent value="overview" className="rounded-md p-4 text-sm shadow-(--custom-shadow)">Request completed in 1.42 seconds across 12 spans.</TabsContent><TabsContent value="prompt" className="rounded-md p-4 font-mono text-xs shadow-(--custom-shadow)">Summarize the customer request…</TabsContent><TabsContent value="response" className="rounded-md p-4 text-sm shadow-(--custom-shadow)">Your order is on its way.</TabsContent></Tabs></div>;
}

export const story = defineStory({ id: "primitives/tabs", registryItem: "ui-tabs", displayName: "Tabs", Component: TabsStory, args: [{ variant: "Default", initial: { args: { variant: 'overview' } } }] });
