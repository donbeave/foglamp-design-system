/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator } from "@foglamp/design-system/ui/select";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { variant: 'gpt-4.1' };
function SelectStory({ args }: { args: Args }) {
  const [model, setModel] = useState("gpt-4.1");
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid max-w-xs gap-2"><Label>Model</Label><Select value={model} onValueChange={value => value && setModel(value)}><SelectTrigger><SelectValue placeholder="Choose a model" /></SelectTrigger><SelectContent><SelectGroup><SelectLabel>OpenAI</SelectLabel><SelectItem value="gpt-4.1">GPT-4.1</SelectItem><SelectItem value="o4-mini">o4-mini</SelectItem></SelectGroup><SelectSeparator /><SelectGroup><SelectLabel>Anthropic</SelectLabel><SelectItem value="claude-sonnet">Claude Sonnet</SelectItem></SelectGroup></SelectContent></Select><p className="text-xs text-muted-foreground">Selected: {model}</p></div></div>;
}

export const story = defineStory({ id: "primitives/select", registryItem: "ui-select", displayName: "Select", Component: SelectStory, args: [{ variant: "Default", initial: { args: { variant: 'gpt-4.1' } } }] });
