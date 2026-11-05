/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Switch } from "@tailrocks/framerock/ui/switch";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

type Args = { enabled: true };
function SwitchStory({ args }: { args: Args }) {
  const [enabled, setEnabled] = useState(true);
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="flex w-full max-w-sm items-center justify-between gap-4"><div><Label htmlFor="live-refresh">Live refresh</Label><p className="text-xs text-muted-foreground">Update this dashboard automatically.</p></div><Switch id="live-refresh" checked={enabled} onCheckedChange={setEnabled} /></div></div>;
}

export const story = defineStory({ id: "primitives/switch", registryItem: "ui-switch", displayName: "Switch", Component: SwitchStory, args: [{ variant: "Default", initial: { args: { enabled: true } } }] });
