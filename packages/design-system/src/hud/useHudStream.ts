/**
 * Original UI & design: Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs.
 * Extracted from https://github.com/foglamp-labs/foglamp — Apache-2.0.
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
