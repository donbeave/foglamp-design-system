/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { ScanLanding } from '@foglamp/design-system/blocks/scan/scan-landing';
import { defineStory } from '../../lib/story';
function ScanLandingStory({ tryFoglampHref }: { tryFoglampHref: string }) { return <ScanLanding tryFoglampHref={tryFoglampHref} onCopy={() => {}} />; }
export const story = defineStory({ id: 'blocks/scan-landing-block', displayName: 'Scan Landing', registryItem: 'block-scan-scan-landing', Component: ScanLandingStory, args: { initial: { tryFoglampHref: '#scan-demo' } } });
