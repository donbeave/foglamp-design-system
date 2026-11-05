/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { NativeSelect, NativeSelectOption } from "@foglamp/design-system/ui/native-select";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function NativeSelectStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid max-w-xs gap-2"><Label htmlFor="region">Deployment region</Label><NativeSelect id="region" defaultValue="us-east"><NativeSelectOption value="us-east">US East</NativeSelectOption><NativeSelectOption value="eu-west">EU West</NativeSelectOption><NativeSelectOption value="ap-south">Asia Pacific</NativeSelectOption></NativeSelect><p className="text-xs text-muted-foreground">Uses the browser’s native selection menu.</p></div></div>;
}

export const story = defineStory({ id: "primitives/native-select", registryItem: "ui-native-select", displayName: "Native Select", Component: NativeSelectStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
