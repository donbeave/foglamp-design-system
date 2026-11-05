/** Original design and implementation by Gustavo Fior (@gustavo-fior), Abdul Haidar and Foglamp Labs.
 * Adapted from foglamp-labs/foglamp apps/web/src/components/app/sunset-card.tsx under Apache-2.0.
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
