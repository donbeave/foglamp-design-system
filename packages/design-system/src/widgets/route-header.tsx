/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/route-header.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/route-header.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";



import { navItem } from "./nav";
import { PageHeader } from "./page-parts";
import { useRange } from "./range-context";
import { RangeControl } from "./range-picker";

/**
 * RangeControl bound to the shared range context. The context lives in the app
 * shell (above the page boundary), so a picker rendered by a route's
 * loading.tsx is fully live during the suspense window — changing the range
 * while a page streams in carries over to the mounted page.
 */
export function LiveRangePicker() {
	const { range, setRange } = useRange();
	return <RangeControl value={range} onChange={setRange} />;
}

/**
 * Per-route page header rendered by BOTH a route's loading.tsx and its client
 * component, so navigation paints the real header instantly and the
 * fallback → page swap is pixel-identical. Define each route's header once in
 * a header.tsx next to its page.tsx; don't inline titles in two places.
 */
export function RouteHeader({
	href,
	title,
	description,
	back,
	noIcon,
	withRange,
	actions,
}: {
	/** Nav href used to look up the section icon (and the back crumb target). */
	href: string;
	title: string;
	description?: React.ReactNode;
	/** Render a breadcrumb back to `href` instead of the section icon. */
	back?: boolean;
	/** Skip the section icon (settings/operator pages render a plain title). */
	noIcon?: boolean;
	/** Prepend the live range picker to the actions. */
	withRange?: boolean;
	actions?: React.ReactNode;
}) {
	const item = navItem(href);
	const composedActions =
		withRange || actions ? (
			<>
				{withRange && <LiveRangePicker />}
				{actions}
			</>
		) : undefined;
	if (back) {
		return (
			<PageHeader
				title={title}
				back={item}
				description={description}
				actions={composedActions}
			/>
		);
	}
	return (
		<PageHeader
			title={title}
			icon={noIcon ? undefined : item?.icon}
			iconClassName={noIcon ? undefined : item?.iconClassName}
			description={description}
			actions={composedActions}
		/>
	);
}
