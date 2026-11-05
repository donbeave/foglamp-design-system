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
import { IconSunsetFilled } from "@tabler/icons-react";

export function SunsetCard({ serverUrl }: { serverUrl?: string }) {
  if (serverUrl !== "https://api.foglamp.dev") return null;
  return <div className="mb-1 flex flex-col gap-1.5 rounded-3xl squircle:rounded-[40px] corner-squircle border border-amber-500/10 bg-amber-500/10 p-3 px-3.5 text-xs text-amber-700 dark:text-amber-400">
    <div className="flex items-center gap-1.5"><IconSunsetFilled className="size-3" /><span className="font-medium text-[13px]">Foglamp is sunsetting</span></div>
    <p>The hosted service stops on October 18, 2026 and all data will be deleted. Want an export? <a href="mailto:gustavo@foglamp.dev" className="underline">Email us</a>.</p>
  </div>;
}
