/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function LabelStory({
  text = "Workspace name",
  required = true,
}: {
  text?: string;
  required?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="workspace">
          {text}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </Label>
        <input id="workspace" className="h-9 rounded-md bg-background px-3 shadow-(--custom-shadow)" defaultValue="Production" />
        <p className="text-xs text-muted-foreground">Visible to your team.</p>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/label",
  registryItem: "ui-label",
  displayName: "Label",
  Component: LabelStory,
  args: [
    { variant: "Required", initial: { text: "Workspace name", required: true } },
    { variant: "Optional", initial: { text: "Description", required: false } },
  ],
});
