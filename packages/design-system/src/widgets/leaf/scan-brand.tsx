/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/scan/brand.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/scan/brand.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";

import { cn } from "../../lib/utils";
import { IconSparklesFilled } from "@tabler/icons-react";
import { type ReactNode, useState } from "react";

import { ClaudeLogo, GeminiLogo, OpenAILogo } from "../../icons/brand-logos";
import { modelDomain } from "../../lib/scan/favicon";
import { useScanFavicon } from "../../blocks/scan/favicon-context";

/** Framerock brand mark — three interlocking rounded-square frames (lead → blue → orange). */
export function BrandMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 96 48"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			{/* lead frame follows currentColor so callers can set it (e.g. white on the art card) */}
			<rect x="4" y="4" width="40" height="40" rx="10" className="fill-current" />
			<rect x="28" y="4" width="40" height="40" rx="10" fill="#0090FD" />
			<rect x="52" y="4" width="40" height="40" rx="10" fill="#FF5513" />
			<rect x="14" y="14" width="20" height="20" rx="4" className="fill-background/90" />
			<rect x="38" y="14" width="20" height="20" rx="4" className="fill-background/90" />
			<rect x="62" y="14" width="20" height="20" rx="4" className="fill-background/90" />
		</svg>
	);
}

/**
 * A favicon image resolved through the same-origin proxy, with a glyph/letter
 * fallback when there's no domain or the image fails to load. Size and rounding
 * come from `className`.
 */
export function Favicon({
	domain,
	fallback,
	className,
}: {
	domain?: string;
	fallback: ReactNode;
	className?: string;
}) {
	const [failed, setFailed] = useState(false);
	const faviconUrl = useScanFavicon();
	if (!domain || failed) return <>{fallback}</>;
	return (
		// eslint-disable-next-line @next/next/no-img-element -- same-origin favicon proxy; no optimization wanted
		<img
			src={faviconUrl(domain)}
			alt=""
			className={cn("corner-squircle object-contain", className)}
			onError={() => setFailed(true)}
		/>
	);
}

/**
 * A model's mark. Known models get the crisp local brand SVG (favicons ship on
 * white tiles — Claude's starburst-in-a-box); anything else falls back to the
 * favicon proxy, then a sparkle glyph.
 */
export function ModelIcon({
	label,
	domain,
	className,
}: {
	label: string;
	domain?: string;
	className?: string;
}) {
	if (/claude|anthropic/i.test(label))
		return <ClaudeLogo className={className} />;
	if (/gemini/i.test(label)) return <GeminiLogo className={className} />;
	if (/gpt|openai|^o\d/i.test(label))
		return <OpenAILogo className={className} />;
	return (
		<Favicon
			domain={modelDomain(label, domain)}
			className={className}
			fallback={<IconSparklesFilled className={className} />}
		/>
	);
}
