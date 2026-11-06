/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Skeleton } from "@tailrocks/framerock/ui/skeleton";
import { defineStory } from "../../lib/story";

function SkeletonStory({
  rows = 3,
  showAvatar = true,
}: {
  rows?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center gap-3">
          {showAvatar ? <Skeleton className="size-10 rounded-full" /> : null}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: Math.max(1, rows) }, (_, idx) => (
            <Skeleton key={idx} className="h-6 w-full rounded-md" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">A trace card loading placeholder.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/skeleton",
  registryItem: "ui-skeleton",
  displayName: "Skeleton",
  Component: SkeletonStory,
  args: [
    { variant: "Default", initial: { rows: 3, showAvatar: true } },
    { variant: "Compact", initial: { rows: 2, showAvatar: false } },
  ],
});
