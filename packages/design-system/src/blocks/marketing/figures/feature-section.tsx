/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/feature/feature-section.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/feature/feature-section.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { Button } from "../../../ui/button";
import { cn } from "../../../lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { FramerockLink } from "../../../lib/link-context";

export type FeatureSectionProps = {
	eyebrow?: string;
	title: string;
	description: string;
	bullets?: string[];
	/** Page-owned visual (chart, flow, code, …). */
	visual: React.ReactNode;
	/** Which side the visual sits on at desktop; alternate down the page. */
	visualPosition?: "right" | "left";
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
	/** Full Tailwind text-color class for the eyebrow + bullet checks. */
	accentClassName?: string;
};

export function FeatureSection({
	eyebrow,
	title,
	description,
	bullets,
	visual,
	visualPosition = "right",
	primaryCta,
	secondaryCta,
	accentClassName = "text-foreground",
}: FeatureSectionProps) {
	return (
		<section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
			<div
				className={cn(
					"flex flex-col gap-5",
					visualPosition === "left" && "lg:order-2",
				)}
			>
				{eyebrow && (
					<span
						className={cn(
							"text-sm font-semibold tracking-wide uppercase",
							accentClassName,
						)}
					>
						{eyebrow}
					</span>
				)}
				<h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
					{title}
				</h2>
				<p className="text-lg text-muted-foreground text-pretty">
					{description}
				</p>

				{bullets && bullets.length > 0 && (
					<ul className="flex flex-col gap-3">
						{bullets.map((b) => (
							<li key={b} className="flex items-start gap-2.5 text-sm">
								<IconCheck
									className={cn("mt-0.5 size-4 shrink-0", accentClassName)}
								/>
								<span className="text-foreground/90">{b}</span>
							</li>
						))}
					</ul>
				)}

				{(primaryCta || secondaryCta) && (
					<div className="mt-2 flex flex-wrap gap-3">
						{primaryCta && (
							<Button render={<FramerockLink href={primaryCta.href} />}>
								{primaryCta.label}
							</Button>
						)}
						{secondaryCta && (
							<Button
								variant="outline"
								render={<FramerockLink href={secondaryCta.href} />}
							>
								{secondaryCta.label}
							</Button>
						)}
					</div>
				)}
			</div>

			<div className={cn(visualPosition === "left" && "lg:order-1")}>
				{visual}
			</div>
		</section>
	);
}
