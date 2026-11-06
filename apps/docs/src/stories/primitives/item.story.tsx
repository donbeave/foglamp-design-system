/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@tailrocks/framerock/ui/item";
import { defineStory } from "../../lib/story";

function ItemStory({
  title = "Production deployment",
  meta = "Model evaluation completed · 2 minutes ago",
  variant = "outline",
}: {
  title?: string;
  meta?: string;
  variant?: "default" | "outline" | "muted";
}) {
  return (
    <div className="flex min-h-24 w-full max-w-lg items-center justify-center p-4">
      <ItemGroup>
        <Item variant={variant}>
          <ItemMedia variant="icon">✦</ItemMedia>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{meta}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <button type="button" className="text-sm text-primary">Review</button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/item",
  registryItem: "ui-item",
  displayName: "Item",
  Component: ItemStory,
  args: [
    { variant: "Outline", initial: { title: "Production deployment", meta: "Model evaluation completed · 2 minutes ago", variant: "outline" } },
    { variant: "Muted", initial: { title: "Staging trace capture", meta: "12 spans indexed · 14s ago", variant: "muted" } },
    { variant: "Default", initial: { title: "Prompt revision v14", meta: "Active in production", variant: "default" } },
  ],
});
