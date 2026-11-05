/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@foglamp/design-system/ui/item";
import { defineStory } from "../../lib/story";

type Args = { variant: 'outline' };
function ItemStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><ItemGroup><Item variant={args.variant}><ItemMedia variant="icon">✦</ItemMedia><ItemContent><ItemTitle>Production deployment</ItemTitle><ItemDescription>Model evaluation completed · 2 minutes ago</ItemDescription></ItemContent><ItemActions><button className="text-sm text-primary">Review</button></ItemActions></Item></ItemGroup></div>;
}

export const story = defineStory({ id: "primitives/item", registryItem: "ui-item", displayName: "Item", Component: ItemStory, args: [{ variant: "Default", initial: { args: { variant: 'outline' } } }] });
