/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/theme-switcher.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/theme-switcher.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../lib/utils";
import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

// resolvedTheme is undefined during SSR and the first client render. We render a
// stable icon until mounted so the server and client agree; the real icon (and
// the active radio value) only appear once the theme is known on the client.
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// Same spring as the SDK-version toggle (instrument-empty-state), so segmented
// controls across the app glide identically.
const MORPH = { type: "spring", stiffness: 400, damping: 38 } as const;

const THEME_OPTIONS = [
  { value: "system", label: "System", icon: IconDeviceLaptop },
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
] as const;

/**
 * Three-way theme control as a segmented pill (system / light / dark), matching
 * the SDK-version toggle. Switches instantly on click — no menu (used in the
 * marketing footer). The dropdown variant lives in {@link ThemeSubmenu}.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  // Unique per instance so the sliding pill is scoped to this control.
  const pillId = useId();

  return (
    <div className="inline-flex  items-center">
      {THEME_OPTIONS.map((opt) => {
        // Track the chosen setting (theme), not the resolved value, so "System"
        // is its own selectable state. Nothing is active until mounted, so the
        // server and first client render agree.
        const active = mounted && theme === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            aria-label={opt.label}
            aria-pressed={active}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground/60 hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                transition={MORPH}
                className="absolute inset-0 rounded-full bg-input/50 shadow-(--custom-shadow) dark:bg-input/50"
              />
            )}
            <Icon className="relative z-10 size-3.5" />
          </button>
        );
      })}
    </div>
  );
}

/** Theme picker rendered as a submenu item, for use inside another dropdown. */
export function ThemeSubmenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {mounted && resolvedTheme === "dark" ? <IconMoon /> : <IconSun />}
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          value={mounted ? theme : undefined}
          onValueChange={setTheme}
        >
          <DropdownMenuRadioItem value="light">
            <IconSun />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <IconMoon />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <IconDeviceLaptop />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
