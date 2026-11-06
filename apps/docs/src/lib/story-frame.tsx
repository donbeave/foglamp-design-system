import { useTheme } from 'fumadocs-ui/provider/base';
import { useEffect, useRef } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type SurfaceMode = 'Default' | 'Muted' | 'Dark Lift';
type Appearance = { type: 'foglamp-story:appearance'; theme: ThemeMode; surface: SurfaceMode; sequence: number };

function applyDomAppearance(mode: 'light' | 'dark', surface: SurfaceMode) {
  const isDark = mode === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
  document.documentElement.style.colorScheme = mode;
  const isDarkLift = surface === 'Dark Lift';
  document.body.classList.toggle('dark', isDarkLift);
  document.body.style.background = surface === 'Muted' ? 'var(--muted)' : isDarkLift ? '#171615' : 'var(--background)';
  document.body.style.color = isDarkLift ? '#f5f3ef' : 'var(--foreground)';
}

function readParentDocumentTheme(): 'light' | 'dark' | null {
  try {
    if (window.parent && window.parent !== window && window.parent.location.origin === window.location.origin) {
      return window.parent.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
  } catch {
    // Ignore cross-origin access errors.
  }
  return null;
}

export function StoryFrameAppearance() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const latest = useRef({ theme, resolvedTheme, setTheme });
  latest.current = { theme, resolvedTheme, setTheme };
  const applied = useRef(false);
  const desiredMode = useRef<'light' | 'dark'>('light');
  const desiredSurface = useRef<SurfaceMode>('Default');
  const sequence = useRef(0);
  const report = (mode: 'light' | 'dark', source: 'ack' | 'child') => {
    window.parent.postMessage({ type: 'foglamp-story:theme-state', mode, resolved: mode, sequence: sequence.current, source }, location.origin);
  };
  useEffect(() => {
    const initialParent = readParentDocumentTheme();
    if (initialParent && !applied.current) {
      desiredMode.current = initialParent;
      applyDomAppearance(initialParent, desiredSurface.current);
    }
    const onMessage = (event: MessageEvent<Appearance>) => {
      const data = event.data;
      if (event.origin !== location.origin || event.source !== window.parent || data?.type !== 'foglamp-story:appearance' || !['light', 'dark', 'system'].includes(data.theme) || !['Default', 'Muted', 'Dark Lift'].includes(data.surface) || !Number.isSafeInteger(data.sequence)) return;
      if (data.sequence < sequence.current) return;
      sequence.current = data.sequence;
      applied.current = true;
      const resolvedTarget: 'light' | 'dark' = data.theme === 'system' ? (readParentDocumentTheme() ?? 'light') : data.theme;
      desiredMode.current = resolvedTarget;
      desiredSurface.current = data.surface;
      applyDomAppearance(resolvedTarget, data.surface);
      latest.current.setTheme(resolvedTarget);
      report(resolvedTarget, 'ack');
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'foglamp-story:ready' }, location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);
  useEffect(() => {
    if (!applied.current) return;
    const activeMode: 'light' | 'dark' | null = theme === 'dark' || theme === 'light' ? theme : resolvedTheme === 'dark' || resolvedTheme === 'light' ? resolvedTheme : null;
    if (!activeMode) return;
    const isChildChange = activeMode !== desiredMode.current;
    desiredMode.current = activeMode;
    applyDomAppearance(activeMode, desiredSurface.current);
    if (isChildChange) report(activeMode, 'child');
  }, [theme, resolvedTheme]);
  return null;
}
