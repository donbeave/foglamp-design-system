/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Separator } from "@tailrocks/framerock/ui/separator";
import { defineStory } from "../../lib/story";

type Args = { variant: 'horizontal' };
function SeparatorStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="w-full max-w-sm space-y-4"><div><h3 className="font-medium">Model run completed</h3><p className="text-sm text-muted-foreground">12 spans · 1.42 s total</p></div><Separator /><div className="flex justify-between text-sm"><span>Input tokens</span><span>1,284</span></div><div className="flex justify-between text-sm"><span>Output tokens</span><span>392</span></div></div></div>;
}

export const story = defineStory({ id: "primitives/separator", registryItem: "ui-separator", displayName: "Separator", Component: SeparatorStory, args: [{ variant: "Default", initial: { args: { variant: 'horizontal' } } }] });
