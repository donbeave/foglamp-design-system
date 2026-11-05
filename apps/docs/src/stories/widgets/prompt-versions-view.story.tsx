/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PromptVersionsView } from '@tailrocks/framerock/widgets/prompt-versions-card';
import { promptVersionsFixture } from './fixtures';
import { defineStory } from '../../lib/story';
function PromptVersionsPreview({ loading = false }: { loading?: boolean }) { return <div className="w-full"><PromptVersionsView versions={promptVersionsFixture} loading={loading} skeleton={loading}/></div>; }
export const story = defineStory({ id: 'widgets/prompt-versions-view', displayName: 'PromptVersionsView', registryItem: 'widget-prompt-versions-card', Component: PromptVersionsPreview, args: [{ variant: 'Version history', initial: { loading: false } }, { variant: 'Loading history', initial: { loading: true } }] });
