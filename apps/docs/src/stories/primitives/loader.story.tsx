/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { TextShimmerLoader } from "@tailrocks/framerock/ui/loader";
import { defineStory } from "../../lib/story";

function LoaderStory({
  label = "Thinking through the trace…",
  size = "md",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid gap-3">
        <TextShimmerLoader text={label} size={size} />
        <p className="text-xs text-muted-foreground">The shimmer announces an active model response.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/loader",
  registryItem: "ui-loader",
  displayName: "Loader",
  Component: LoaderStory,
  args: [
    { variant: "Medium", initial: { label: "Thinking through the trace…", size: "md" } },
    { variant: "Small", initial: { label: "Indexing spans…", size: "sm" } },
    { variant: "Large", initial: { label: "Synthesizing evaluation report…", size: "lg" } },
  ],
});
