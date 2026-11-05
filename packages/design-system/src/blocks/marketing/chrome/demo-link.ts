/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path apps/web/src/components/marketing/landing/demo-link.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/apps/web/src/components/marketing/landing/demo-link.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

// A one-way line from the benefit sections down the page to the live demo in
// the hero. The demo registers a handler when it mounts; the explore buttons
// and feature chips ask it to show a tab. Nothing is registered before the
// demo's chunk loads, or while its frame is hidden on small screens, so a
// caller learns whether the request was handled and can fall back.

import type { DemoTab } from "../demo/mock-data";

export type { DemoTab };

type Handler = (tab: DemoTab) => boolean;

let handler: Handler | null = null;

export function registerDemo(fn: Handler): () => void {
  handler = fn;
  return () => {
    if (handler === fn) handler = null;
  };
}

/** Show `tab` in the hero demo and scroll to it. False when there is no demo
 * to show it in. */
export function showInDemo(tab: DemoTab): boolean {
  return handler?.(tab) ?? false;
}
