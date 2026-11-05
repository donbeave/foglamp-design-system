/**
 * Portal composition for the Foglamp design system, extracted AS-IS from
 * foglamp-labs/foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs. Original visual components are composed without restyling.
 */
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { Card } from '@foglamp/design-system/ui/card';
import { FoglampLinkProvider } from '@foglamp/design-system/lib/link-context';
import { MarketingNavbar, CuttingMatFooterBlock } from '@foglamp/design-system/blocks/marketing/chrome';
import { Hero3DDemoBlock } from '@foglamp/design-system/blocks/marketing/hero';
import { DriftingFogCtaBlock } from '@foglamp/design-system/blocks/marketing/cta';
import { OriginalAuthorsBlock } from '@foglamp/design-system/blocks/marketing/original-authors-block';
import { story as ButtonStory } from '../stories/primitives/button.story';

export const Route = createFileRoute('/')({ component: HomePage });

function PortalLink({ href, to, ...props }: ComponentProps<typeof Link> & { href?: string }) {
  const destination = to ?? href ?? '/';
  const productDocs: Record<string, string> = {
    '/features/cost-intelligence': '/docs/figures/costs-total',
    '/features/evals': '/docs/figures/quality-review',
    '/features/alerts': '/docs/figures/costs-alert',
    '/features/agents': '/docs/widgets/agent-icon',
    '/features/distributed-traces': '/docs/widgets/trace-timeline',
    '/features/sdk': '/docs/foundations/installation',
  };
  const routes: Record<string, string> = {
    '/': '/',
    '/homepage': '/',
    '/login': '/docs/foundations/installation',
    '/overview': '/docs/blocks/overview-dashboard-block',
    '/pricing': '/docs/foundations/installation',
    '/scan': '/docs/blocks/scan-landing-block',
    '/hud': '/docs/widgets/foglamp-hud',
    '/about': '/docs/credits',
    '/privacy': 'https://foglamp.dev/privacy',
    '/terms': 'https://foglamp.dev/terms',
  };
  const mapped = productDocs[destination] ?? routes[destination] ?? destination;
  if (mapped.startsWith('https://')) {
    const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...anchorProps} href={mapped} />;
  }
  return <Link {...props} to={mapped as '/docs/$' | '/stories/$' | '/'} />;
}

function HomePage() {
  const links = [
    { label: 'Foundations', href: '/docs/foundations/tokens' },
    { label: 'Components', href: '/docs/primitives/button' },
    { label: 'Stories', href: '/docs/primitives/button' },
    { label: 'Credits', href: '/docs/credits' },
  ];

  return (
    <FoglampLinkProvider component={PortalLink}>
      <main>
        <MarketingNavbar links={links} homeHref="/" loginHref="/docs/foundations/installation" dashboardHref="/docs" />
        <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8" aria-label="Original creator attribution">
          <p className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-full squircle:rounded-2xl corner-squircle bg-secondary px-4 py-2 text-sm text-secondary-foreground shadow-(--custom-shadow-secondary)">
            Original design by <a className="font-medium text-foreground underline underline-offset-4" href="https://github.com/gustavo-fior" target="_blank" rel="noreferrer noopener">Gustavo Fior (@gustavo-fior)</a>, co-founder <a className="underline underline-offset-4" href="https://www.linkedin.com/in/abdulhdr/" target="_blank" rel="noreferrer noopener">Abdul Haidar</a>, and <a className="underline underline-offset-4" href="https://foglamp.dev" target="_blank" rel="noreferrer noopener">Foglamp Labs</a> · extracted AS-IS from <a className="underline underline-offset-4" href="https://github.com/foglamp-labs/foglamp" target="_blank" rel="noreferrer noopener">foglamp-labs/foglamp</a>
          </p>
        </section>
        <Hero3DDemoBlock />
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-labelledby="interactive-story-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Interactive story</p><h2 id="interactive-story-title" className="mt-2 font-display text-2xl font-medium tracking-tight">Explore the component controls</h2></div>
            <Link to={'/docs/primitives/button' as '/docs/$'} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">Open primitive reference</Link>
          </div>
          <ButtonStory.WithControl />
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-24 sm:grid-cols-3 sm:px-8" aria-label="Explore the design system">
          {[
            { title: 'Foundations', description: 'Tokens, geometry, typography, and motion.', href: '/docs/foundations/tokens' },
            { title: 'Component reference', description: 'Browse primitives, widgets, charts, and blocks.', href: '/docs/primitives/button' },
            { title: 'Interactive stories', description: 'Inspect live components with controls.', href: '/docs/primitives/button' },
          ].map((item) => <Link key={item.title} to={item.href} className="block rounded-lg squircle:rounded-3xl corner-squircle transition-colors hover:bg-accent"><Card className="h-full p-6"><h2 className="font-display text-xl font-medium">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p></Card></Link>)}
        </section>
        <OriginalAuthorsBlock />
        <DriftingFogCtaBlock startFreeHref="/docs/foundations/installation" />
        <CuttingMatFooterBlock />
      </main>
    </FoglampLinkProvider>
  );
}
