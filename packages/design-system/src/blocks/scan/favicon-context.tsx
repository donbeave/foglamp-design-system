/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance tailrocks-original
 * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
 *
 * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
 * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
 */

"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getGoogleFavicon } from "../../widgets/leaf/favicon";

const FaviconContext = createContext(getGoogleFavicon);

/** Supply your image endpoint or asset resolver without changing map markup. */
export function ScanFaviconProvider({ resolve, children }: {
  resolve: (domain: string) => string;
  children: ReactNode;
}) {
  return <FaviconContext.Provider value={resolve}>{children}</FaviconContext.Provider>;
}

export function useScanFavicon() {
  return useContext(FaviconContext);
}
