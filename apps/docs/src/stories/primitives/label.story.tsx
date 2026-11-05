/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function LabelStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid max-w-sm gap-2"><Label htmlFor="workspace">Workspace name</Label><input id="workspace" className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="Production" /><p className="text-xs text-muted-foreground">Visible to your team.</p></div></div>;
}

export const story = defineStory({ id: "primitives/label", registryItem: "ui-label", displayName: "Label", Component: LabelStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
