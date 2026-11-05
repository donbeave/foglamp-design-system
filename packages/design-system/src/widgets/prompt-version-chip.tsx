/** Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted AS-IS from .reference/foglamp/apps/web/src/components/app/prompt-version-chip.tsx; derived under Apache-2.0.
 */
"use client";

import { Badge } from "../ui/badge";
import { FoglampLink } from "../lib/link-context";

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
      render={<FoglampLink href={promptVersionsHref(agentName)} />}
    >
      {label}
    </Badge>
  );
}
