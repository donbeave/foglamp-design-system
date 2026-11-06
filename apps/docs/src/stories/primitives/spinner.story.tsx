/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Spinner } from "@tailrocks/framerock/ui/spinner";
import { defineStory } from "../../lib/story";

const sizeClasses = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-6",
} as const;

function SpinnerStory({
  label = "Loading trace details",
  size = "md",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="flex items-center gap-3">
        <Spinner className={sizeClasses[size]} />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/spinner",
  registryItem: "ui-spinner",
  displayName: "Spinner",
  Component: SpinnerStory,
  args: [
    { variant: "Medium", initial: { label: "Loading trace details", size: "md" } },
    { variant: "Small", initial: { label: "Syncing spans", size: "sm" } },
    { variant: "Large", initial: { label: "Running evaluation batch", size: "lg" } },
  ],
});
