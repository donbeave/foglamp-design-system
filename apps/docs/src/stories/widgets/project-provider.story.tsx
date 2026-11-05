/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useProject } from '@tailrocks/framerock/widgets/project-context';
import { ProjectStoryFrame } from './fixtures';
import { defineStory } from '../../lib/story';
function ProjectProviderPreview() { const { project, projects, setProjectId } = useProject(); return <div className="flex flex-col gap-2"><span className="text-sm">Current project: {project?.name ?? 'None'}</span><div className="flex gap-2">{projects.map(item => <button key={item.id} className="rounded-md border px-2 py-1 text-xs" onClick={() => setProjectId(item.id)}>{item.name}</button>)}</div></div>; }
function ProjectProviderStory() { return <ProjectStoryFrame><ProjectProviderPreview/></ProjectStoryFrame>; }
export const story = defineStory({ id: 'widgets/project-provider', displayName: 'ProjectProvider', registryItem: 'widget-project-context', Component: ProjectProviderStory, args: [{ variant: 'Project selection', initial: {} }] });
