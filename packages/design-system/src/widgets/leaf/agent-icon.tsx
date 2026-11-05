/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/agent-icon.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/agent-icon.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/agent-icon.tsx; derived here under Apache-2.0.
 */
import { IconGhost, IconGhostFilled } from "@tabler/icons-react";

import { cn } from "../../lib/utils";

// A spread of mid-tone hues that read on both light and dark surfaces. One is
// picked deterministically from the agent name (see `agentColor`), so an agent
// always gets the same color while different agents stay visually distinct —
// the same idea as the per-project placeholder icons.
const AGENT_COLORS = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#84cc16", // lime-500
  "#22c55e", // green-500
  "#10b981", // emerald-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
  "#0ea5e9", // sky-500
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#a855f7", // purple-500
  "#d946ef", // fuchsia-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
];

// djb2 string hash — small, fast, and stable across runs so the color is
// reproducible for a given name.
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** A reproducible accent color (hex) for an agent, derived from its name. */
export function agentColor(name: string | null | undefined): string {
  const key = name?.trim() ?? "";
  if (!key) return AGENT_COLORS[0];
  return AGENT_COLORS[hashString(key) % AGENT_COLORS.length];
}

/** A ghost glyph tinted with the agent's reproducible color. By default it renders
 * the outline variant with a faint `fill-current/20` wash — the standard treatment
 * for an agent's custom-color icon everywhere it appears (filters, breakdowns,
 * tables, headers). `filled` opts into the solid variant when needed; size is set
 * via `className` (defaults to `size-4`). The color is applied inline so it
 * overrides any text-color class, and `fill-current` resolves to that same color. */
export function AgentIcon({
  name,
  filled = false,
  className,
}: {
  name: string | null | undefined;
  filled?: boolean;
  className?: string;
}) {
  const Icon = filled ? IconGhostFilled : IconGhost;
  return (
    <Icon
      className={cn("size-4 shrink-0", !filled && "fill-current/20", className)}
      style={{ color: agentColor(name) }}
    />
  );
}
