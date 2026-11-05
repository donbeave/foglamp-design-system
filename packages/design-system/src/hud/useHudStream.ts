/**
 * @license Apache-2.0
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
 * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
 *
 * @provenance modified
 * @upstream-repo https://github.com/foglamp-labs/foglamp
 * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
 * @upstream-path packages/sdk/src/hud/react/useHudStream.ts
 * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/packages/sdk/src/hud/react/useHudStream.ts
 * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
 *
 * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
 * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
 * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
 */

"use client";
import { useCallback, useEffect, useReducer, useState } from "react";
import type { HudEvent } from "./events";
import { initialState, reduce, type HudState } from "./model";
export type ConnStatus = "connecting" | "open" | "closed";
export interface HudStream {
  subscribe(listener: (event: HudEvent) => void): () => void;
}
/** Local event transport for docs and host integrations. Replays supplied events. */
export function createMockHudStream(initialEvents: readonly HudEvent[] = []) {
  const history = [...initialEvents];
  const listeners = new Set<(event: HudEvent) => void>();
  return {
    subscribe(listener: (event: HudEvent) => void) {
      history.forEach(listener);
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    emit(event: HudEvent) {
      history.push(event);
      listeners.forEach(listener => listener(event));
    },
  } satisfies HudStream & { emit(event: HudEvent): void };
}
/** Consume typed local events without requiring a backend or network connection. */
export function useHudStream(stream?: HudStream): {
  state: HudState; conn: ConnStatus; clear: () => void;
} {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [conn, setConn] = useState<ConnStatus>("closed");
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  useEffect(() => {
    dispatch({ type: "clear" });
    if (stream) {
      setConn("open");
      return stream.subscribe(dispatch);
    }
    setConn("closed");
  }, [stream]);
  return { state, conn, clear };
}
