/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@tailrocks/framerock/ui/radio-group";
import { defineStory } from "../../lib/story";

function RadioGroupStory({
  defaultValue = "balanced",
  disabled = false,
}: {
  defaultValue?: "fast" | "balanced" | "thorough";
  disabled?: boolean;
}) {
  const [value, setValue] = useState<string>(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const options = [
    ["fast", "Fast · low latency"],
    ["balanced", "Balanced · default judge"],
    ["thorough", "Thorough · multi-step rubric"],
  ] as const;

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <fieldset className="grid gap-3">
        <legend className="mb-2 text-sm font-medium">Evaluation mode</legend>
        <RadioGroup
          value={value}
          onValueChange={(next) => {
            if (typeof next === "string") setValue(next);
          }}
          disabled={disabled}
        >
          {options.map(([optionValue, label]) => (
            <label key={optionValue} className="flex cursor-pointer items-center gap-3">
              <RadioGroupItem value={optionValue} />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/radio-group",
  registryItem: "ui-radio-group",
  displayName: "Radio Group",
  Component: RadioGroupStory,
  args: [
    { variant: "Balanced", initial: { defaultValue: "balanced", disabled: false } },
    { variant: "Thorough", initial: { defaultValue: "thorough", disabled: false } },
    { variant: "Disabled", initial: { defaultValue: "fast", disabled: true } },
  ],
});
