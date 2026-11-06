/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { Slider } from "@tailrocks/framerock/ui/slider";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function SliderStory({
  defaultValue = 65,
  step = 5,
  disabled = false,
}: {
  defaultValue?: number;
  step?: number;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid w-full max-w-sm gap-4">
        <div className="flex justify-between text-sm">
          <Label>Sampling rate</Label>
          <span>{value}%</span>
        </div>
        <Slider
          value={[value]}
          min={0}
          max={100}
          step={step}
          disabled={disabled}
          onValueChange={(v) => setValue(typeof v === "number" ? v : (v[0] ?? 0))}
          aria-label="Sampling rate"
        />
        <p className="text-xs text-muted-foreground">Adjust the percentage of requests recorded.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/slider",
  registryItem: "ui-slider",
  displayName: "Slider",
  Component: SliderStory,
  args: [
    { variant: "Default", initial: { defaultValue: 65, step: 5, disabled: false } },
    { variant: "Full capture", initial: { defaultValue: 100, step: 10, disabled: false } },
    { variant: "Disabled", initial: { defaultValue: 25, step: 5, disabled: true } },
  ],
});
