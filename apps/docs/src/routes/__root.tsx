import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
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
  return <html suppressHydrationWarning><head><HeadContent /></head><body><RootProvider><Outlet /></RootProvider><Scripts /></body></html>;
}
