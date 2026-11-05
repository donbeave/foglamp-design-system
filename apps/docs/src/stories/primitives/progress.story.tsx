/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@foglamp/design-system/ui/progress";
import { defineStory } from "../../lib/story";

type Args = { value: 68 };
function ProgressStory({ args }: { args: Args }) {
  const [value, setValue] = useState(68);
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="w-full max-w-md"><Progress value={args.value}><div className="mb-2 flex items-center justify-between"><ProgressLabel>Indexing traces</ProgressLabel><ProgressValue /></div><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress><input aria-label="Progress value" type="range" min="0" max="100" value={args.value} onChange={e => setValue(Number(e.target.value))} className="mt-4 w-full" /></div></div>;
}

export const story = defineStory({ id: "primitives/progress", registryItem: "ui-progress", displayName: "Progress", Component: ProgressStory, args: [{ variant: "Default", initial: { args: { value: 68 } } }] });
