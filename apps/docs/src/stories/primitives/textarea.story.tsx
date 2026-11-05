/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Textarea } from "@foglamp/design-system/ui/textarea";
import { Label } from "@foglamp/design-system/ui/label";
import { defineStory } from "../../lib/story";

type Args = { prompt: 'You are a helpful checkout assistant. Be concise and confirm order details.' };
function TextareaStory({ args }: { args: Args }) {
  const [prompt, setPrompt] = useState("You are a helpful checkout assistant. Be concise and confirm order details.");
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="grid w-full max-w-md gap-2"><Label htmlFor="system-prompt">System prompt</Label><Textarea id="system-prompt" value={prompt} onChange={event => setPrompt(event.target.value)} rows={5} /><div className="flex justify-between text-xs text-muted-foreground"><span>Used by the checkout assistant</span><span>{prompt.length} characters</span></div></div></div>;
}

export const story = defineStory({ id: "primitives/textarea", registryItem: "ui-textarea", displayName: "Textarea", Component: TextareaStory, args: [{ variant: "Default", initial: { args: { prompt: 'You are a helpful checkout assistant. Be concise and confirm order details.' } } }] });
