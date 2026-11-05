/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { OnboardingPanelBlock } from '@tailrocks/framerock/blocks/auth/onboarding-panel';
import { StorySurface } from './fixtures';
import { defineStory } from '../../lib/story';
function OnboardingPanelStory({ apiKey }: { apiKey: string }) { return <StorySurface><OnboardingPanelBlock apiKey={apiKey} onPromptCopied={() => {}} /></StorySurface>; }
export const story = defineStory({ id: 'blocks/onboarding-panel-block', displayName: 'Onboarding Panel', registryItem: 'block-auth-onboarding-panel', Component: OnboardingPanelStory, args: { initial: { apiKey: 'fl_demo_1234567890' } } });
