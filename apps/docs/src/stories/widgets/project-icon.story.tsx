/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ProjectIcon } from '@tailrocks/framerock/widgets/leaf/project-icon';
import { defineStory } from '../../lib/story';
function ProjectIconPreview({ name = 'Acme Production', size = 'md' }: { name?: string; size?: 'xs' | 'sm' | 'md' }) { return <div className="flex items-center gap-3"><ProjectIcon name={name} url={null} size={size}/><span>{name}</span></div>; }
export const story = defineStory({ id: 'widgets/project-icon', displayName: 'ProjectIcon', registryItem: 'widget-leaf-project-icon', Component: ProjectIconPreview, args: [{ variant: 'Medium', initial: { name: 'Acme Production', size: 'md' } }, { variant: 'Small', initial: { name: 'Staging', size: 'sm' } }] });
