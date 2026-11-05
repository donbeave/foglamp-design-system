import { useTheme } from 'fumadocs-ui/provider/base';
import { useEffect } from 'react';

type Appearance = { type: 'foglamp-story:appearance'; theme: 'light' | 'dark'; surface: 'Default' | 'Muted' | 'Dark Lift' };

export function StoryFrameAppearance() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const onMessage = (event: MessageEvent<Appearance>) => {
      const data = event.data;
      if (event.origin !== location.origin || event.source !== window.parent || data?.type !== 'foglamp-story:appearance' || !['light', 'dark'].includes(data.theme) || !['Default', 'Muted', 'Dark Lift'].includes(data.surface)) return;
      setTheme(data.theme);
      document.body.style.background = data.surface === 'Muted' ? 'var(--muted)' : data.surface === 'Dark Lift' ? 'oklch(0.23 0 0)' : 'var(--background)';
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'foglamp-story:ready' }, location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, [setTheme]);
  return null;
}
