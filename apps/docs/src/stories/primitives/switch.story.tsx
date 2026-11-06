/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { Switch } from "@tailrocks/framerock/ui/switch";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function SwitchStory({
  label = "Live refresh",
  defaultChecked = true,
  disabled = false,
}: {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm items-center justify-between gap-4">
        <div>
          <Label htmlFor="live-refresh">{label}</Label>
          <p className="text-xs text-muted-foreground">Update this dashboard automatically.</p>
        </div>
        <Switch id="live-refresh" checked={checked} disabled={disabled} onCheckedChange={setChecked} />
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/switch",
  registryItem: "ui-switch",
  displayName: "Switch",
  Component: SwitchStory,
  args: [
    { variant: "Enabled", initial: { label: "Live refresh", defaultChecked: true, disabled: false } },
    { variant: "Off", initial: { label: "Live refresh", defaultChecked: false, disabled: false } },
    { variant: "Disabled", initial: { label: "Locked policy", defaultChecked: true, disabled: true } },
  ],
});
