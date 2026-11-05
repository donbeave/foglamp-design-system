/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/app/tool-icon.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/app/tool-icon.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

import {
	type Icon,
	IconDownload,
	IconList,
	IconSearch,
	IconTool,
} from "@tabler/icons-react";

import { cn } from "../../lib/utils";

// Icon by tool-name convention — mirrors the HUD's toolGlyph(): search/find/
// query/lookup, list/ls/index/all, and get/fetch/read/load get a recognizable
// icon; everything else falls back to the generic wrench.
function toolIcon(name: string): Icon {
	const n = name.toLowerCase();
	if (/^(search|find|query|lookup)/.test(n)) return IconSearch;
	if (/^(list|ls|index|all)/.test(n)) return IconList;
	if (/^(get|fetch|read|load)/.test(n)) return IconDownload;
	return IconTool;
}

/** A tool's icon, picked from its name. Only the wrench fallback is filled —
 * the named variants are outline glyphs and would render as blobs. */
export function ToolIcon({
	name,
	className,
}: {
	name: string;
	className?: string;
}) {
	const Glyph = toolIcon(name);
	return <Glyph className={cn(className)} />;
}
