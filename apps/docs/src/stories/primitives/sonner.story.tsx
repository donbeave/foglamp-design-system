/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@tailrocks/framerock/ui/button";
import { Toaster } from "@tailrocks/framerock/ui/sonner";
import { defineStory } from "../../lib/story";

function SonnerStory({
  message = "Evaluation run queued",
  description = "Results will stream into the trace table.",
}: {
  message?: string;
  description?: string;
}) {
  useEffect(() => {
    toast.success(message, { description });
  }, [message, description]);

  return (
    <div className="relative flex min-h-48 w-full max-w-md flex-col items-start justify-between rounded-xl border bg-muted/15 p-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            toast.success(message, { description });
          }}
        >
          Trigger toast
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            toast.error("Judge timeout", {
              description: "Retrying with fallback model.",
            });
          }}
        >
          Error toast
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            toast.dismiss();
          }}
        >
          Dismiss
        </Button>
      </div>
      <Toaster closeButton />
    </div>
  );
}

export const story = defineStory({
  id: "primitives/sonner",
  registryItem: "ui-sonner",
  displayName: "Sonner",
  Component: SonnerStory,
  frame: { height: 280 },
  args: [
    { variant: "Default", initial: { message: "Evaluation run queued", description: "Results will stream into the trace table." } },
    { variant: "Export notice", initial: { message: "Trace export ready", description: "Downloaded 148 spans as JSONL." } },
  ],
});
