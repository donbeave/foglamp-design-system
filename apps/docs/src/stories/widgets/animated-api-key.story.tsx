/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { AnimatedApiKey } from '@foglamp/design-system/widgets/animated-api-key';
import { defineStory } from '../../lib/story';
function AnimatedApiKeyPreview({ from = 'production key', value = 'sk_live_foglamp_7Kp4qR2v' }: { from?: string; value?: string }) { return <div className="rounded-md border bg-card px-3 py-2"><AnimatedApiKey from={from} value={value}/></div>; }
export const story = defineStory({ id: 'widgets/animated-api-key', displayName: 'AnimatedApiKey', registryItem: 'widget-animated-api-key', Component: AnimatedApiKeyPreview, args: [{ variant: 'New key reveal', initial: { from: 'production key', value: 'sk_live_foglamp_7Kp4qR2v' } }] });
