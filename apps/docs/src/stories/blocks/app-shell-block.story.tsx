/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { AppShellBlock } from '@foglamp/design-system/blocks/app-shell/app-shell-block';
import type { Project } from '@foglamp/design-system/widgets/project-context';
import type { NewProjectInput } from '@foglamp/design-system/blocks/app-shell/new-project-dialog';
import { defineStory } from '../../lib/story';
import { StoryLinkAdapter, StorySurface } from './fixtures';

function AppShellStory({ pathname, isLoading }: { pathname: string; isLoading: boolean }) {
  const [projects, setProjects] = useState<Project[]>([{ id: 'demo', name: 'Acme Production', slug: 'acme-production', url: null, orgId: 'org-demo', orgName: 'Acme', orgSlug: 'acme' }]);
  const createProject = async (input: NewProjectInput) => {
    const project: Project = { id: `local-${projects.length + 1}`, name: input.name || 'Local project', slug: 'local-demo', url: input.url ?? null, orgId: input.orgId || 'org-demo', orgName: 'Acme', orgSlug: 'acme' };
    setProjects(current => [...current, project]);
    return project;
  };
  return <StorySurface><StoryLinkAdapter><div className="h-[760px] overflow-hidden rounded-lg"><AppShellBlock pathname={pathname} projects={projects} isLoading={isLoading} onNewProject={createProject} user={{ name: 'Alex Rivera', email: 'alex@example.com' }}><section className="px-6"><h1 className="text-2xl font-semibold">Overview</h1><p className="mt-2 text-muted-foreground">A local app shell demo. Navigation and project selection stay inside this story.</p></section></AppShellBlock></div></StoryLinkAdapter></StorySurface>;
}
export const story = defineStory({ id: 'blocks/app-shell-block', displayName: 'App Shell Block', registryItem: 'block-app-shell-app-shell', Component: AppShellStory, args: { initial: { pathname: '/overview', isLoading: false } }, frame: { width: 1280, height: 800 } });
