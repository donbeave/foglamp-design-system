import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import appCss from '../styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { title: 'Foglamp Design System' }],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: Root,
});

function Root() {
  const location = useRouterState({ select: state => state.location });
  const isStory = location.pathname.startsWith('/stories/');
  const instance = new URLSearchParams(location.searchStr).get('instance') ?? location.pathname;
  return <html suppressHydrationWarning><head><HeadContent /></head><body><RootProvider theme={isStory ? { storageKey: `foglamp-story-theme:${instance}`, hotKey: false } : undefined}><Outlet /></RootProvider><Scripts /></body></html>;
}
