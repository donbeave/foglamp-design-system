/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { Progress, ProgressLabel, ProgressValue } from "@tailrocks/framerock/ui/progress";
import { defineStory } from "../../lib/story";

function ProgressStory({
  value = 68,
  label = "Indexing traces",
}: {
  value?: number;
  label?: string;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Progress value={currentValue}>
          <div className="flex w-full items-center justify-between">
            <ProgressLabel>{label}</ProgressLabel>
            <ProgressValue />
          </div>
        </Progress>
        <input
          aria-label="Progress value"
          type="range"
          min="0"
          max="100"
          value={currentValue}
          onChange={(e) => setCurrentValue(Number(e.target.value))}
          className="mt-4 w-full"
        />
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/progress",
  registryItem: "ui-progress",
  displayName: "Progress",
  Component: ProgressStory,
  args: [
    { variant: "In progress", initial: { value: 68, label: "Indexing traces" } },
    { variant: "Complete", initial: { value: 100, label: "Evaluation complete" } },
  ],
});
