/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { InstrumentEmptyStateBlock } from '@foglamp/design-system/blocks/auth/instrument-empty-state';
import { BrandMark } from '@foglamp/design-system/blocks/marketing/chrome/brand-mark';
import { StorySurface } from './fixtures';
import { defineStory } from '../../lib/story';
function InstrumentEmptyStateStory({ feature, title }: { feature: 'agent' | 'workflow' | 'session'; title: string }) { return <StorySurface><InstrumentEmptyStateBlock feature={feature} title={title} icon={BrandMark} description="Add observability to your first AI workflow." /></StorySurface>; }
export const story = defineStory({ id: 'blocks/instrument-empty-state-block', displayName: 'Instrument Empty State', registryItem: 'block-auth-instrument-empty-state', Component: InstrumentEmptyStateStory, args: { initial: { feature: 'agent', title: 'No agent traces yet' } } });
