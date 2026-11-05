/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Toggle } from "@foglamp/design-system/ui/toggle";
import { defineStory } from "../../lib/story";

type Args = { bold: false };
function ToggleStory({ args }: { args: Args }) {
  const [bold, setBold] = useState(false);
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid gap-3"><div className="flex gap-2"><Toggle aria-label="Bold" pressed={bold} onPressedChange={setBold}><strong>B</strong></Toggle><Toggle aria-label="Italic"><em>I</em></Toggle><Toggle aria-label="Underline"><u>U</u></Toggle></div><p className="text-sm">Formatting controls for a prompt editor.</p></div></div>;
}

export const story = defineStory({ id: "primitives/toggle", registryItem: "ui-toggle", displayName: "Toggle", Component: ToggleStory, args: [{ variant: "Default", initial: { args: { bold: false } } }] });
