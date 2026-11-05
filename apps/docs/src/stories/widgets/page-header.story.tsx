/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PageHeader } from '@tailrocks/framerock/widgets/page-parts';
import { defineStory } from '../../lib/story';
function PageHeaderPreview({ title = 'Trace explorer', description = 'Inspect model activity across your projects.' }: { title?: string; description?: string }) { return <PageHeader title={title} description={description}/>; }
export const story = defineStory({ id: 'widgets/page-header', displayName: 'PageHeader', registryItem: 'widget-page-header', Component: PageHeaderPreview, args: [{ variant: 'List page', initial: { title: 'Trace explorer', description: 'Inspect model activity across your projects.' } }, { variant: 'Detail page', initial: { title: 'Support assistant', description: 'Agent performance and prompt versions.' } }] });
