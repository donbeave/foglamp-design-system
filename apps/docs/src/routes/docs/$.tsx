import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Suspense, use } from 'react';
import { docs, source } from '../../lib/source';

const serverLoader = createServerFn({ method: 'GET' })
  .validator((slugs: string[]) => slugs)
  .handler(async ({ data }) => {
    const page = source.getPage(data);
    if (!page) throw notFound();
    return { path: page.path, pageTree: await source.serializePageTree(source.getPageTree()) };
  });

export const Route = createFileRoute('/docs/$')({
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params._splat?.split('/') ?? [] });
    await docs.getPage(data.path)?.preload();
    return data;
  },
  component: Page,
});

function Content({ path }: { path: string }) {
  const page = docs.getPage(path);
  if (!page) throw notFound();
  const { toc } = use(page.load());
  const MDX = page.body;
  return <DocsPage toc={toc}><DocsTitle>{page.title}</DocsTitle><DocsDescription>{page.description}</DocsDescription><DocsBody><MDX components={defaultMdxComponents} /></DocsBody></DocsPage>;
}
function Page() {
  const data = useFumadocsLoader(Route.useLoaderData());
  return <DocsLayout tree={data.pageTree} nav={{ title: 'Foglamp Design System' }}><Suspense><Content path={data.path} /></Suspense></DocsLayout>;
}
