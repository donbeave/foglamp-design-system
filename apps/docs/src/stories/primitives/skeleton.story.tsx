/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Skeleton } from "@tailrocks/framerock/ui/skeleton";
import { defineStory } from "../../lib/story";

type Args = { variant: 'card' };
function SkeletonStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="w-full max-w-sm space-y-3"><div className="flex items-center gap-3"><Skeleton className="size-10 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/2" /><Skeleton className="h-3 w-3/4" /></div></div><Skeleton className="h-24 w-full rounded-lg" /><p className="text-xs text-muted-foreground">A trace card loading placeholder.</p></div></div>;
}

export const story = defineStory({ id: "primitives/skeleton", registryItem: "ui-skeleton", displayName: "Skeleton", Component: SkeletonStory, args: [{ variant: "Default", initial: { args: { variant: 'card' } } }] });
