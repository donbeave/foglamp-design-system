/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/quota-card.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/quota-card.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { FramerockLink } from "../lib/link-context";

// Small sidebar card shown when the org nears (≥90%) or exceeds its monthly
// span quota. Reads the same usage endpoint as the Usage tab; polls so it
// clears once the period resets or the org upgrades.
export type QuotaUsage = { spans: { pct: number } };

/** Data-driven quota notice. The default empty mock keeps it hidden. */
export function QuotaCardView({
  usage = null,
  billingHref = "/settings/org?tab=billing",
}: {
  usage?: QuotaUsage | null;
  billingHref?: string;
}) {
  const pct = usage?.spans.pct;
  if (pct == null || pct < 0.9) return null;
  const over = pct >= 1;

  return (
    <div
      className={cn(
        "mb-1 flex flex-col gap-2 rounded-3xl squircle:rounded-[40px] corner-squircle p-3 px-3.5 text-xs",
        over
          ? "border-destructive/30 bg-destructive/10 text-destructive shadow-(--custom-shadow-destructive)"
          : "border-amber-500/10 bg-amber-500/10 text-amber-700 dark:text-amber-400 border"
      )}
    >
      <div className="flex gap-1.5 items-center">
        <IconAlertTriangleFilled className="size-3" />
        <span className="font-medium text-[13px]">
          {over
            ? "Span quota exceeded"
            : `${Math.round(pct * 100)}% of span quota used`}
        </span>
      </div>

      <div
        className={cn(
          "h-1 w-full overflow-hidden rounded-full mt-1",
          over ? "bg-destructive/20" : "bg-amber-500/20"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            over ? "bg-destructive" : "bg-amber-500"
          )}
          style={{ width: `${Math.min(pct, 1) * 100}%` }}
        />
      </div>
      {!over && (
        <span className="text-muted-foreground">
          Resets at the start of next month.
        </span>
      )}
      <Button
        variant="ghost-destructive"
        size="sm"
        className="mt-1 w-full"
        render={<FramerockLink href={billingHref} />}
      >
        {over ? "Upgrade now" : "Review billing"}
      </Button>
    </div>
  );
}

/** Backward-friendly short name for app shells using the original component name. */
export const QuotaCard = QuotaCardView;
