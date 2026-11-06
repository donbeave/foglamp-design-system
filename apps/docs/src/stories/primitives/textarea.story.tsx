/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Textarea } from "@tailrocks/framerock/ui/textarea";
import { Label } from "@tailrocks/framerock/ui/label";
import { defineStory } from "../../lib/story";

function TextareaStory({
  placeholder = "Enter system prompt instructions…",
  rows = 4,
  disabled = false,
}: {
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}) {
  const [prompt, setPrompt] = useState("You are a helpful checkout assistant. Be concise and confirm order details.");
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="grid w-full max-w-md gap-2">
        <Label htmlFor="system-prompt">System prompt</Label>
        <Textarea
          id="system-prompt"
          placeholder={placeholder}
          value={prompt}
          disabled={disabled}
          onChange={(event) => setPrompt(event.target.value)}
          rows={rows}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Used by the checkout assistant</span>
          <span>{prompt.length} characters</span>
        </div>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/textarea",
  registryItem: "ui-textarea",
  displayName: "Textarea",
  Component: TextareaStory,
  args: [
    { variant: "Default", initial: { placeholder: "Enter system prompt instructions…", rows: 4, disabled: false } },
    { variant: "Disabled", initial: { placeholder: "Read-only system prompt", rows: 4, disabled: true } },
  ],
});
