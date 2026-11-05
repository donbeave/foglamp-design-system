import { useTheme } from 'fumadocs-ui/provider/base';
import { useEffect, useRef } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type Appearance = { type: 'foglamp-story:appearance'; theme: ThemeMode; surface: 'Default' | 'Muted' | 'Dark Lift'; sequence: number };

export function StoryFrameAppearance() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const latest = useRef({ theme, resolvedTheme, setTheme });
  latest.current = { theme, resolvedTheme, setTheme };
  const applied = useRef(false);
  const pending = useRef<ThemeMode | null>(null);
  const sequence = useRef(0);
  const report = () => {
    const { theme, resolvedTheme } = latest.current;
    if ((theme !== 'light' && theme !== 'dark' && theme !== 'system') || (resolvedTheme !== 'light' && resolvedTheme !== 'dark')) return;
    window.parent.postMessage({ type: 'foglamp-story:theme-state', mode: theme, resolved: resolvedTheme, sequence: sequence.current }, location.origin);
  };
  useEffect(() => {
    const onMessage = (event: MessageEvent<Appearance>) => {
      const data = event.data;
      if (event.origin !== location.origin || event.source !== window.parent || data?.type !== 'foglamp-story:appearance' || !['light', 'dark', 'system'].includes(data.theme) || !['Default', 'Muted', 'Dark Lift'].includes(data.surface) || !Number.isSafeInteger(data.sequence)) return;
      sequence.current = data.sequence;
      applied.current = true;
      document.body.style.background = data.surface === 'Muted' ? 'var(--muted)' : data.surface === 'Dark Lift' ? 'oklch(0.23 0 0)' : 'var(--background)';
      if (latest.current.theme === data.theme) { pending.current = null; report(); }
      else { pending.current = data.theme; latest.current.setTheme(data.theme); }
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'foglamp-story:ready' }, location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);
  useEffect(() => {
    if (!applied.current || (pending.current && pending.current !== theme)) return;
    pending.current = null;
    report();
  }, [theme, resolvedTheme]);
  return null;
}
