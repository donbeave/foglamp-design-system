/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Slider } from "@foglamp/design-system/ui/slider";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { value: 35 };
function SliderStory({ args }: { args: Args }) {
  const [value, setValue] = useState(35);
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid w-full max-w-sm gap-4"><div className="flex justify-between text-sm"><Label>Sampling rate</Label><span>{value}%</span></div><Slider value={[value]} min={0} max={100} step={5} onValueChange={v => setValue(typeof v === "number" ? v : (v[0] ?? 0))} aria-label="Sampling rate" /><p className="text-xs text-muted-foreground">Adjust the percentage of requests recorded.</p></div></div>;
}

export const story = defineStory({ id: "primitives/slider", registryItem: "ui-slider", displayName: "Slider", Component: SliderStory, args: [{ variant: "Default", initial: { args: { value: 35 } } }] });
