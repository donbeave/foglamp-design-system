/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { SunsetCard } from '@foglamp/design-system/widgets/leaf/sunset-card';
import { defineStory } from '../../lib/story';

const HOSTED_SERVER_URL = 'https://api.foglamp.dev';

type SunsetCardPreviewProps = { serverUrl?: string | null };

function SunsetCardPreview({ serverUrl = HOSTED_SERVER_URL }: SunsetCardPreviewProps) {
  return <div className="w-72"><SunsetCard serverUrl={serverUrl}/></div>;
}

export const story = defineStory({ id: 'widgets/sunset-card', displayName: 'SunsetCard', registryItem: 'widget-leaf-sunset-card', Component: SunsetCardPreview, args: [{ variant: 'Hosted service notice', initial: { serverUrl: HOSTED_SERVER_URL } }, { variant: 'Self-hosted service', initial: { serverUrl: null } }] });
