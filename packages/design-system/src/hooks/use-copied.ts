"use client";

/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/app/use-copied.ts; derived here under Apache-2.0.
 */
import { useEffect, useRef, useState } from "react";

/**
 * Transient "copied" flag for copy-to-clipboard buttons. Resets after
 * `timeoutMs`; the timer is cleared on unmount and on re-copy, so a stale
 * timeout never fires into an unmounted component.
 */
export function useCopied(timeoutMs = 1500) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	useEffect(() => () => clearTimeout(timer.current), []);

	function markCopied() {
		setCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopied(false), timeoutMs);
	}

	function resetCopied() {
		clearTimeout(timer.current);
		setCopied(false);
	}

	return { copied, markCopied, resetCopied };
}
