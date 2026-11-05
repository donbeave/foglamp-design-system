import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import appCss from '../styles/app.css?url';
import inter from '@foglamp/design-system/assets/InterVariable.woff2?url';
import interItalic from '@foglamp/design-system/assets/InterVariable-Italic.woff2?url';
import hostGrotesk from '@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2?url';
import geistMono from '@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { title: 'Foglamp Design System' }],
    links: [
      { rel: 'preload', href: inter, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: interItalic, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: hostGrotesk, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: geistMono, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: Root,
});

function Root() {
  const location = useRouterState({ select: state => state.location });
  const isStory = location.pathname.startsWith('/stories/');
  const instance = new URLSearchParams(location.searchStr).get('instance') ?? location.pathname;
  return <html suppressHydrationWarning><head><HeadContent /></head><body data-source-surface={isStory || location.pathname === '/' ? '' : undefined} className={isStory || location.pathname === '/' ? 'not-fumadocs-codeblock' : undefined}><RootProvider theme={isStory ? { storageKey: `foglamp-story-theme:${instance}`, hotKey: false } : undefined}><Outlet /></RootProvider><Scripts /></body></html>;
}
