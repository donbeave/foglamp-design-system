/**
 * Portal composition for the Foglamp design system, extracted AS-IS from
 * foglamp-labs/foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
 * Foglamp Labs. Original visual components are composed without restyling.
 */
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { Card } from '@tailrocks/framerock/ui/card';
import { FramerockLinkProvider } from '@tailrocks/framerock/lib/link-context';
import { MarketingNavbar, CuttingMatFooterBlock } from '@tailrocks/framerock/blocks/marketing/chrome';
import { Hero3DDemoBlock } from '@tailrocks/framerock/blocks/marketing/hero';
import { DriftingFogCtaBlock } from '@tailrocks/framerock/blocks/marketing/cta';
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
    '/privacy': '/docs/credits',
    '/terms': '/docs/credits',
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
    { label: 'Components', href: '/docs/primitives/button' },
    { label: 'Blocks', href: '/docs/blocks/trace-waterfall-inspector-block' },
    { label: 'Charts', href: '/docs/charts/area-chart' },
    { label: 'Docs', href: '/docs' },
    { label: 'Credits', href: '/docs/credits' },
  ];

  const sections = [
    { title: 'Primitives', description: '56 accessible UI primitives for buttons, inputs, overlays, and layouts.', href: '/docs/primitives/button' },
    { title: 'Widgets', description: '53 observability widgets for traces, prompts, evaluations, and metrics.', href: '/docs/widgets/stat-card' },
    { title: 'Charts & Figures', description: '11 telemetry charts and 22 interactive marketing figures.', href: '/docs/charts/area-chart' },
    { title: 'Blocks', description: '25 full-page application shells, inspectors, and marketing sections.', href: '/docs/blocks/trace-waterfall-inspector-block' },
  ];

  return (
    <FramerockLinkProvider component={PortalLink}>
      <main data-source-surface>
        <MarketingNavbar brandName="Framerock" links={links} homeHref="/" loginHref="/docs/foundations/installation" dashboardHref="/docs" />
        <div className="border-b border-border/60 bg-muted/20 px-4 py-2 text-center text-xs text-muted-foreground" aria-label="Original creator attribution">
          <p className="mx-auto max-w-7xl leading-relaxed">
            <strong>Framerock</strong> by Tailrocks · Built on the open-source foundation of <a className="underline underline-offset-4" href="https://foglamp.dev" target="_blank" rel="noreferrer noopener">Foglamp</a> by <a className="font-medium text-foreground underline underline-offset-4" href="https://gustavofior.com" target="_blank" rel="noreferrer noopener">Gustavo Fior</a> (<a className="underline underline-offset-4" href="https://github.com/gustavo-fior" target="_blank" rel="noreferrer noopener">@gustavo-fior</a>, <a className="underline underline-offset-4" href="https://x.com/heyimgustavo" target="_blank" rel="noreferrer noopener">@heyimgustavo</a>), <a className="underline underline-offset-4" href="https://www.linkedin.com/in/abdulhdr/" target="_blank" rel="noreferrer noopener">Abdul Haidar</a> &amp; <a className="underline underline-offset-4" href="https://github.com/foglamp-labs/foglamp" target="_blank" rel="noreferrer noopener">Foglamp Labs</a> (Apache-2.0) — <Link to={'/docs/credits' as '/docs/$'} className="font-medium text-foreground underline underline-offset-4">Read full origin &amp; credits →</Link>
          </p>
        </div>
        <div className="overflow-hidden pb-28 md:pb-40">
          <Hero3DDemoBlock />
        </div>
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-labelledby="interactive-story-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Interactive story</p><h2 id="interactive-story-title" className="mt-2 font-display text-2xl font-medium tracking-tight">Explore the component controls</h2></div>
            <Link to={'/docs/primitives/button' as '/docs/$'} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">Open primitive reference</Link>
          </div>
          <ButtonStory.WithControl />
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4 sm:px-8" aria-label="Explore the design system">
          {sections.map((item) => <Link key={item.title} to={item.href as '/docs/$'} className="block rounded-lg squircle:rounded-3xl corner-squircle transition-colors hover:bg-accent"><Card className="h-full p-6"><h2 className="font-display text-xl font-medium">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p></Card></Link>)}
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8" aria-labelledby="origin-attribution-title">
          <div className="rounded-xl border bg-card p-6 shadow-(--custom-shadow)">
            <h2 id="origin-attribution-title" className="font-display text-xl font-medium">Origin, Inspiration &amp; Open-Source Attribution</h2>
            <p className="mt-4 text-sm leading-6"><em>“Good artists copy, great artists steal.”</em> — <strong>Steve Jobs</strong> (who famously admitted that Apple has <em>“always been shameless about stealing great ideas”</em>)</p>
            <p className="mt-3 text-sm leading-6">We apply that exact principle here — <strong>openly, proudly, and in full compliance with the Apache-2.0 open-source license</strong>. Every component in <strong>Framerock</strong> is either <strong>copied 1:1 or directly inspired by</strong> <a className="underline underline-offset-4" href="https://foglamp.dev">Foglamp</a> (<a className="underline underline-offset-4" href="https://github.com/foglamp-labs/foglamp">github.com/foglamp-labs/foglamp</a> at commit <a className="font-mono break-all underline underline-offset-4" href="https://github.com/foglamp-labs/foglamp/tree/7d7e6609108019a74902858d4b07c24825c6318b">7d7e660</a>), originally designed and engineered by <a className="underline underline-offset-4" href="https://github.com/gustavo-fior"><strong>Gustavo Fior (@gustavo-fior)</strong></a> (<a className="underline underline-offset-4" href="https://gustavofior.com">gustavofior.com</a> · <a className="underline underline-offset-4" href="https://x.com/heyimgustavo">@heyimgustavo</a> · <a className="underline underline-offset-4" href="https://www.linkedin.com/in/gustavofior">LinkedIn</a>) and co-founder <a className="underline underline-offset-4" href="https://www.linkedin.com/in/abdulhdr/"><strong>Abdul Haidar</strong></a> at <a className="underline underline-offset-4" href="https://foglamp.dev"><strong>Foglamp Labs</strong></a>.</p>
            <p className="mt-3 text-sm leading-6"><strong>Why we extracted this work &amp; our honest humility:</strong> Today, we keep these components <strong>1:1 visually and behaviorally identical</strong> to <code>foglamp-labs/foglamp</code> (with only framework-decoupling modifications documented under Apache-2.0 Section 4(b)). Over time, <strong>Tailrocks</strong> will extend <strong>Framerock</strong> with modified and newly authored components following this design language — though we humbly admit we don&apos;t think we can ever make our additions look quite as extraordinary as how <strong>Gustavo Fior</strong> crafted the originals. We extracted and packaged this system because we fell in love with its rare, obsessive quality and wanted to use it across Tailrocks projects (alongside <code>Termrock</code> for the terminal) and share it with the wider internet.</p>
            <p className="mt-3 text-sm leading-6"><strong>Non-Affiliation Disclaimer:</strong> <strong>Framerock</strong> is an independent open-source project maintained by <a className="underline underline-offset-4" href="https://github.com/tailrocks"><strong>Tailrocks</strong></a> and is not affiliated with, sponsored by, or endorsed by <strong>Gustavo Fior</strong>, <strong>Abdul Haidar</strong>, or <strong>Foglamp Labs</strong>. Any modifications, decoupling changes, or newly added components are solely the responsibility of Tailrocks.</p>
          </div>
        </section>
        <DriftingFogCtaBlock startFreeHref="/docs/foundations/installation" />
        <CuttingMatFooterBlock />
      </main>
    </FramerockLinkProvider>
  );
}
