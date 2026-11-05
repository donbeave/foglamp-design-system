/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/prompt-version-chip.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/prompt-version-chip.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Badge } from "../ui/badge";
import { FramerockLink } from "../lib/link-context";

import { cn } from "../lib/utils";

/** Where an agent's inferred prompt versions are listed. */
export function promptVersionsHref(agentName: string): string {
  return `/agents/${encodeURIComponent(agentName)}#prompt-versions`;
}

/**
 * `v3` chip for a run's inferred prompt version. Links to the agent page's
 * prompt versions when the agent is known. Renders nothing when the prompt
 * job hasn't seen the run's prompt yet (or the prompt isn't recorded).
 */
export function PromptVersionChip({
  version,
  agentName,
  className,
}: {
  version: { id: string; number: number } | null | undefined;
  agentName: string | null | undefined;
  className?: string;
}) {
  if (!version) return null;
  const label = `v${version.number}`;
  const classes = cn("font-mono normal-case tabular-nums", className);
  if (!agentName) {
    return (
      <Badge variant="sky" size="sm" className={classes} title="Prompt version">
        {label}
      </Badge>
    );
  }
  return (
    <Badge
      variant="sky"
      size="sm"
      className={classes}
      title="Prompt version — see all versions"
      // biome-ignore lint/suspicious/noExplicitAny: typed-routes string href
      render={<FramerockLink href={promptVersionsHref(agentName)} />}
    >
      {label}
    </Badge>
  );
}
