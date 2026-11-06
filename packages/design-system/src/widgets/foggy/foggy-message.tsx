/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/foggy/foggy-message.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/foggy/foggy-message.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { IconTool } from "@tabler/icons-react";
import type { FoggyMessageData } from "./types";
import { Streamdown } from "streamdown";

import { cn } from "../../lib/utils";

import { markdownComponents } from "./markdown";

// A subtle pill shown while a tool call is in flight or done, so the user can
// see Foggy reaching into their data.
function ToolChip({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex w-fit items-center gap-1.5 ml-3 py-1 text-xs text-muted-foreground">
      <IconTool
        className={cn(
          "size-3 shrink-0 fill-current stroke-0",
          !done && "animate-pulse"
        )}
      />
      {done ? "Looked up" : "Looking up"} {label}
    </div>
  );
}

// Turn `tool-listTraces` / `dynamic-tool` into a human label.
function toolLabel(type: string, part: Record<string, unknown>): string {
  const name =
    type === "dynamic-tool"
      ? String(part.toolName ?? "data")
      : type.replace(/^tool-/, "");
  return name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

export function FoggyMessage({ message }: { message: FoggyMessageData }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        isUser ? "items-end" : "items-start"
      )}
    >
      {message.parts.map((part, i) => {
        const key = `${message.id}-${i}`;

        if (part.type === "text") {
          if (!part.text) return null;
          return isUser ? (
            <div
              key={key}
              className="max-w-[85%] whitespace-pre-wrap rounded-lg squircle:rounded-3xl corner-squircle bg-card shadow-(--custom-shadow)  px-3 py-2 text-sm text-primary"
            >
              {part.text}
            </div>
          ) : (
            <div
              key={key}
              className="max-w-[90%] px-3 py-0 text-sm leading-relaxed [&_li]:my-0.5 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_pre]:my-2 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 *:first:mt-0 *:last:mb-0"
            >
              <Streamdown
                components={markdownComponents}
                controls={{ table: false }}
              >
                {part.text}
              </Streamdown>
            </div>
          );
        }

        if (part.type === "dynamic-tool" || part.type.startsWith("tool-")) {
          const p = part;
          const done =
            p.state === "output-available" || p.state === "output-error";
          return (
            <ToolChip key={key} label={toolLabel(part.type, p)} done={done} />
          );
        }

        return null;
      })}
    </div>
  );
}

export { FoggyMessage as FoggyAssistantMessage };
