"use client";

/** Host adapter for the Apache-2.0 scan UI by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { createContext, useContext, type ReactNode } from "react";
import { faviconUrl } from "../../lib/scan/favicon";

const FaviconContext = createContext(faviconUrl);

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
