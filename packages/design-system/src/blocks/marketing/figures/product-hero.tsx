/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/feature/product-hero.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/feature/product-hero.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import { Button } from "../../../ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { FramerockLink } from "../../../lib/link-context";

import type { Product } from "../chrome/products";

// The top of every product page: the product's chip + label as an eyebrow, a
// big headline, a sub, two CTAs, and the page-owned hero visual beneath.
export function ProductHero({
	product,
	headline,
	sub,
	visual,
}: {
	product: Product;
	headline: string;
	sub: string;
	visual: React.ReactNode;
}) {
	const Icon = product.icon;
	return (
		<section className="relative overflow-hidden px-5 pt-20 pb-12 sm:px-8 sm:pt-28">
			<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
				<span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-sm font-medium shadow-(--custom-shadow)">
					<span className={product.chipClassName}>
						<Icon className="size-4" />
					</span>
					{product.label}
				</span>
				<h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
					{headline}
				</h1>
				<p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
					{sub}
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button size="lg" render={<FramerockLink href="/login" />}>
						Start free
						<IconArrowRight className="size-4" />
					</Button>
					<Button size="lg" variant="outline" render={<FramerockLink href="/pricing" />}>
						See pricing
					</Button>
				</div>
			</div>

			{visual && <div className="mx-auto mt-14 w-full max-w-4xl">{visual}</div>}
		</section>
	);
}
