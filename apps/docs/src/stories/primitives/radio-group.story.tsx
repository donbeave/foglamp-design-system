/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@foglamp/design-system/ui/radio-group";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function RadioGroupStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><fieldset className="grid gap-3"><legend className="mb-2 text-sm font-medium">Default time range</legend>{[["1h","Last hour"],["24h","Last 24 hours"],["7d","Last 7 days"]].map(([value,label]) => <label key={value} className="flex items-center gap-3"><RadioGroupItem value={value} /><span className="text-sm">{label}</span></label>)}</fieldset></div>;
}

export const story = defineStory({ id: "primitives/radio-group", registryItem: "ui-radio-group", displayName: "Radio Group", Component: RadioGroupStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
