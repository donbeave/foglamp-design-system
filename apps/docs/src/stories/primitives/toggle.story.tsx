/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { Toggle } from "@tailrocks/framerock/ui/toggle";
import { defineStory } from "../../lib/story";

function ToggleStory({
  label = "Pin trace",
  defaultPressed = true,
  disabled = false,
}: {
  label?: string;
  defaultPressed?: boolean;
  disabled?: boolean;
}) {
  const [pressed, setPressed] = useState(defaultPressed);
  useEffect(() => {
    setPressed(defaultPressed);
  }, [defaultPressed]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <Toggle aria-label={label} pressed={pressed} disabled={disabled} onPressedChange={setPressed}>
            {label}
          </Toggle>
          <Toggle aria-label="Highlight errors" variant="outline" disabled={disabled}>
            Errors only
          </Toggle>
        </div>
        <p className="text-xs text-muted-foreground">State: {pressed ? "Pinned" : "Unpinned"}</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/toggle",
  registryItem: "ui-toggle",
  displayName: "Toggle",
  Component: ToggleStory,
  args: [
    { variant: "Pressed", initial: { label: "Pin trace", defaultPressed: true, disabled: false } },
    { variant: "Unpressed", initial: { label: "Pin trace", defaultPressed: false, disabled: false } },
    { variant: "Disabled", initial: { label: "Locked filter", defaultPressed: true, disabled: true } },
  ],
});
