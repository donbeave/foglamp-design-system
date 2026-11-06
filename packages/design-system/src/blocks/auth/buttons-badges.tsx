/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/app/buttons/page.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/app/buttons/page.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import {
	IconArrowRight,
	IconBell,
	IconBellFilled,
	IconBolt,
	IconBoltFilled,
	IconBookmark,
	IconBookmarkFilled,
	IconCamera,
	IconCircleCheckFilled,
	IconClock,
	IconCloud,
	IconCloudFilled,
	IconDownload,
	IconEyeFilled,
	IconFlag,
	IconFlagFilled,
	IconFolder,
	IconFolderFilled,
	IconHeart,
	IconHeartFilled,
	IconHome,
	IconHomeFilled,
	IconMail,
	IconMapPin,
	IconMapPinFilled,
	IconMoon,
	IconMoonFilled,
	IconPlayerPlayFilled,
	IconPlus,
	IconRocket,
	IconSettings,
	IconSettingsFilled,
	IconSparkles,
	IconStar,
	IconStarFilled,
	IconSun,
	IconSunFilled,
	IconThumbUp,
	IconThumbUpFilled,
	IconTrash,
	IconTrashFilled,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

// Dev-only playground for tweaking packages/ui button + badge styles.
// Press T anywhere on the page to flip light/dark.

type IconComponent = typeof IconStar;
type NonEmptyIconPool = readonly [IconComponent, ...IconComponent[]];

const OUTLINED: NonEmptyIconPool = [
	IconStar,
	IconHeart,
	IconPlus,
	IconArrowRight,
	IconDownload,
	IconSettings,
	IconTrash,
	IconBolt,
	IconBell,
	IconBookmark,
	IconCamera,
	IconClock,
	IconCloud,
	IconFlag,
	IconFolder,
	IconHome,
	IconMail,
	IconMapPin,
	IconMoon,
	IconSun,
	IconRocket,
	IconSparkles,
	IconThumbUp,
];

const FILLED: NonEmptyIconPool = [
	IconStarFilled,
	IconHeartFilled,
	IconBellFilled,
	IconBookmarkFilled,
	IconBoltFilled,
	IconCircleCheckFilled,
	IconTrashFilled,
	IconSettingsFilled,
	IconPlayerPlayFilled,
	IconFlagFilled,
	IconFolderFilled,
	IconHomeFilled,
	IconMoonFilled,
	IconSunFilled,
	IconCloudFilled,
	IconMapPinFilled,
	IconEyeFilled,
	IconThumbUpFilled,
];

// Deterministic "random" assignment so server and client render the same
// markup (Math.random would break hydration). Each slot index gets a varied
// icon, alternates filled/outlined, and flips between leading/trailing.
function pick(i: number) {
	const filled = i % 2 === 1;
	const pool = filled ? FILLED : OUTLINED;
  const Icon = pool[(i * 7 + 3) % pool.length] ?? pool[0];
	const leading = i % 3 !== 1;
	return { Icon, leading };
}

const BUTTON_VARIANTS = [
	"default",
	"outline",
	"secondary",
	"ghost",
	"ghost-destructive",
	"destructive",
	"link",
] as const;

const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

const BADGE_VARIANTS = [
	"default",
	"secondary",
	"destructive",
	"green",
	"blue",
	"amber",
	"orange",
	"emerald",
	"rose",
	"violet",
	"outline",
] as const;

const BADGE_SIZES = ["md", "lg"] as const;

export function useThemeHotkey() {
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() !== "t" || e.metaKey || e.ctrlKey || e.altKey)
				return;
			const target = e.target;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
			)
				return;
			setTheme(resolvedTheme === "dark" ? "light" : "dark");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [resolvedTheme, setTheme]);
}

function Row({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-3">
			<span className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
				{label}
			</span>
			<div className="flex flex-wrap items-center gap-2">{children}</div>
		</div>
	);
}

export function ButtonsBadgesPlaygroundBlock() {
	useThemeHotkey();

	// Monotonic slot counter across the whole page so no two adjacent
	// buttons/badges draw the same icon.
	let slot = 0;

	return (
		<main className="mx-auto max-w-4xl space-y-12 px-6 py-12">
			<div>
				<h1 className="text-lg font-semibold">Buttons & badges playground</h1>
				<p className="text-sm text-muted-foreground">
					Press <kbd className="rounded border px-1 font-mono text-xs">T</kbd>{" "}
					to toggle the theme
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="text-sm font-semibold text-muted-foreground">Buttons</h2>
				<div className="space-y-3">
					{BUTTON_VARIANTS.map((variant) => (
						<Row key={variant} label={variant}>
							{BUTTON_SIZES.map((size) => {
								const { Icon, leading } = pick(slot++);
								return (
									<Button key={size} variant={variant} size={size}>
										{leading && <Icon />}
										Button
										{!leading && <Icon />}
									</Button>
								);
							})}
						</Row>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-sm font-semibold text-muted-foreground">Badges</h2>
				<div className="space-y-3">
					{BADGE_VARIANTS.map((variant) => (
						<Row key={variant} label={variant}>
							{BADGE_SIZES.map((size) => {
								const { Icon, leading } = pick(slot++);
								return (
									<Badge key={size} variant={variant} size={size}>
										{leading && <Icon />}
										Badge
										{!leading && <Icon />}
									</Badge>
								);
							})}
						</Row>
					))}
				</div>
			</section>
		</main>
	);
}
