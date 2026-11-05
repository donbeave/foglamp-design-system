/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/sunset-card.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/sunset-card.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/sunset-card.tsx; derived here under Apache-2.0.
 */
import { IconSunsetFilled } from "@tabler/icons-react";

// Shutdown notice for the hosted deployment only. Self-hosts point
// NEXT_PUBLIC_SERVER_URL elsewhere and never see it.
const HOSTED_SERVER_URL = "https://api.foglamp.dev";
const SHUTDOWN_DATE = "October 18, 2026";

type SunsetCardProps = { serverUrl?: string | null };

function getRuntimeServerUrl(): string | undefined {
  const process: unknown = Reflect.get(globalThis, "process");
  if (typeof process !== "object" || process === null || !("env" in process)) {
    return undefined;
  }

  const env = process.env;
  if (typeof env !== "object" || env === null || !("NEXT_PUBLIC_SERVER_URL" in env)) {
    return undefined;
  }

  const serverUrl = env.NEXT_PUBLIC_SERVER_URL;
  return typeof serverUrl === "string" ? serverUrl : undefined;
}

export function SunsetCard({ serverUrl }: SunsetCardProps) {
  const resolvedServerUrl = serverUrl === undefined ? getRuntimeServerUrl() : serverUrl;
  if (resolvedServerUrl !== HOSTED_SERVER_URL) return null;

  return (
    <div className="mb-1 flex flex-col gap-1.5 rounded-3xl squircle:rounded-[40px] corner-squircle border border-amber-500/10 bg-amber-500/10 p-3 px-3.5 text-xs text-amber-700 dark:text-amber-400">
      <div className="flex items-center gap-1.5">
        <IconSunsetFilled className="size-3" />
        <span className="font-medium text-[13px]">Foglamp is sunsetting</span>
      </div>
      <p>
        The hosted service stops on {SHUTDOWN_DATE} and all data will be
        deleted. Want an export?{" "}
        <a href="mailto:gustavo@foglamp.dev" className="underline">
          Email us
        </a>
        .
      </p>
    </div>
  );
}
