/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/brand-mark.tsx
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/brand-mark.tsx
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

export function BrandMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 96 48"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<rect
				x="4"
				y="4"
				width="40"
				height="40"
				rx="10"
				className="fill-[#1e1e1e] dark:fill-[#EEE]"
			/>
			<rect x="28" y="4" width="40" height="40" rx="10" fill="#0090FD" />
			<rect x="52" y="4" width="40" height="40" rx="10" fill="#FF5513" />
			<rect x="14" y="14" width="20" height="20" rx="4" className="fill-background/90" />
			<rect x="38" y="14" width="20" height="20" rx="4" className="fill-background/90" />
			<rect x="62" y="14" width="20" height="20" rx="4" className="fill-background/90" />
		</svg>
	);
}
