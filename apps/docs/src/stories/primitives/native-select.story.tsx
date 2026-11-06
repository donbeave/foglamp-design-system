/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { NativeSelect, NativeSelectOption } from "@tailrocks/framerock/ui/native-select";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function NativeSelectStory({
  defaultRegion = "us-east",
  size = "default",
  disabled = false,
}: {
  defaultRegion?: "us-east" | "eu-west" | "ap-south";
  size?: "sm" | "default";
  disabled?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="region">Deployment region</Label>
        <NativeSelect key={defaultRegion} id="region" size={size} disabled={disabled} defaultValue={defaultRegion}>
          <NativeSelectOption value="us-east">US East</NativeSelectOption>
          <NativeSelectOption value="eu-west">EU West</NativeSelectOption>
          <NativeSelectOption value="ap-south">Asia Pacific</NativeSelectOption>
        </NativeSelect>
        <p className="text-xs text-muted-foreground">Uses the browser’s native selection menu.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/native-select",
  registryItem: "ui-native-select",
  displayName: "Native Select",
  Component: NativeSelectStory,
  args: [
    { variant: "Default", initial: { defaultRegion: "us-east", size: "default", disabled: false } },
    { variant: "Small", initial: { defaultRegion: "eu-west", size: "sm", disabled: false } },
    { variant: "Disabled", initial: { defaultRegion: "ap-south", size: "default", disabled: true } },
  ],
});
