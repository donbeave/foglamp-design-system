/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { TextShimmerLoader } from "@tailrocks/framerock/ui/loader";
import { defineStory } from "../../lib/story";

type Args = { label: 'Thinking through the trace…', size: 'md' };
function LoaderStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid gap-3"><TextShimmerLoader text={args.label} size={args.size} /><p className="text-xs text-muted-foreground">The shimmer announces an active model response.</p></div></div>;
}

export const story = defineStory({ id: "primitives/loader", registryItem: "ui-loader", displayName: "Loader", Component: LoaderStory, args: [{ variant: "Default", initial: { args: { label: 'Thinking through the trace…', size: 'md' } } }] });
