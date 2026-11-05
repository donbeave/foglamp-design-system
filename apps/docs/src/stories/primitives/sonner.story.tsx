/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Toaster } from "@foglamp/design-system/ui/sonner";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function SonnerStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="flex flex-wrap gap-2"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground" onClick={() => document.dispatchEvent(new CustomEvent("foglamp:toast", { detail: { type: "success", message: "Evaluation passed" } }))}>Success toast</button><button className="rounded-md px-3 py-2 shadow-(--custom-shadow)" onClick={() => document.dispatchEvent(new CustomEvent("foglamp:toast", { detail: { type: "error", message: "Export failed" } }))}>Error toast</button><Toaster /></div></div>;
}

export const story = defineStory({ id: "primitives/sonner", registryItem: "ui-sonner", displayName: "Sonner", Component: SonnerStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
