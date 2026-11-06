/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/customer-avatar.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/customer-avatar.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { IconUser, IconUserFilled } from "@tabler/icons-react";
import { useState } from "react";

import { agentColor } from "./agent-icon";
import { cn } from "../../lib/utils";

/**
 * A customer's avatar: their `imageUrl` when present, else a user glyph tinted
 * with a reproducible color derived from the customer id (same hashing as
 * `AgentIcon`, so a customer always gets the same color). `filled` opts into the
 * solid glyph (matching `AgentIcon`'s treatment). The image renders as a plain
 * `<img>` (no Next image optimizer) so customer-supplied URLs are never fetched
 * server-side; a broken URL falls back to the tinted glyph.
 */
export function CustomerAvatar({
	customerId,
	customerName,
	imageUrl,
	filled = false,
	className,
}: {
	customerId: string;
	customerName?: string | null;
	imageUrl?: string | null;
	filled?: boolean;
	className?: string;
}) {
	const [broken, setBroken] = useState(false);
	if (imageUrl && !broken) {
		return (
			// eslint-disable-next-line @next/next/no-img-element -- customer-supplied URL, no optimization/server fetch wanted
			<img
				src={imageUrl}
				alt={customerName ?? customerId}
				referrerPolicy="no-referrer"
				loading="lazy"
				onError={() => setBroken(true)}
				className={cn("size-4 shrink-0 rounded-full object-cover", className)}
			/>
		);
	}
	const Icon = filled ? IconUserFilled : IconUser;
	return (
		<Icon
			className={cn("size-4 shrink-0", className)}
			style={{ color: agentColor(customerId) }}
		/>
	);
}
