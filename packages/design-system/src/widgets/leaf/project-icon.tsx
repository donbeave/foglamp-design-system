/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/project-icon.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/project-icon.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import {
  type Icon,
  IconChefHatFilled,
  IconCherryFilled,
  IconCloudFilled,
  IconDropletFilled,
  IconFlameFilled,
  IconFlask2Filled,
  IconFlowerFilled,
  IconMeteorFilled,
  IconTriangleFilled,
} from "@tabler/icons-react";

import { getGoogleFavicon } from "./favicon";

// Placeholder icons used when a project has no favicon. One is picked
// deterministically from the project name, so the same project always shows
// the same icon while different projects get some visual variety.
const placeholderIcons: Icon[] = [
  IconCloudFilled,
  IconFlask2Filled,
  IconFlowerFilled,
  IconCherryFilled,
  IconMeteorFilled,
  IconFlameFilled,
  IconDropletFilled,
  IconChefHatFilled,
  IconTriangleFilled,
];

function placeholderIcon(name: string | null | undefined): Icon {
  const letter = name?.trim().charAt(0).toLowerCase() ?? "";
  const code = letter.charCodeAt(0);
  const index = Number.isNaN(code) ? 0 : code % placeholderIcons.length;
  return placeholderIcons[index];
}

// A project's favicon (from its URL) or a per-project placeholder icon, in a
// rounded box.
export function ProjectIcon({
  url,
  name,
  size = "md",
}: {
  url: string | null | undefined;
  name?: string | null | undefined;
  size?: "xs" | "sm" | "md";
}) {
  const box =
    size === "md"
      ? "size-5 rounded-lg corner-squircle shadow-(--custom-shadow)"
      : size === "sm"
        ? "size-5 rounded-lg corner-squircle shadow-(--custom-shadow)"
        : "size-3.25 rounded-md corner-squircle shadow-(--custom-shadow)";
  if (url) {
    return (
      <img
        src={getGoogleFavicon(url)}
        alt=""
        className={`${box} bg-background object-cover`}
      />
    );
  }
  const PlaceholderIcon = placeholderIcon(name);
  return (
    <div
      className={`flex aspect-square items-center justify-center shadow-(--custom-shadow) bg-primary/10 text-primary ${box}`}
    >
      <PlaceholderIcon
        className={
          size === "md" ? "size-4" : size === "sm" ? "size-3" : "size-2.5"
        }
      />
    </div>
  );
}
