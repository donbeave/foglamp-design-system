/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { SunsetCard } from '@tailrocks/framerock/widgets/leaf/sunset-card';
import { defineStory } from '../../lib/story';

const HOSTED_SERVER_URL = 'https://cloud.framerock.dev';

type SunsetCardPreviewProps = { serverUrl?: string | null };

function SunsetCardPreview({ serverUrl = HOSTED_SERVER_URL }: SunsetCardPreviewProps) {
  return (
    <div className="w-72">
      <SunsetCard serverUrl={serverUrl} />
      {!serverUrl ? (
        <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs text-muted-foreground">
          Self-hosted instance detected — sunset notice hidden.
        </div>
      ) : null}
    </div>
  );
}

export const story = defineStory({ id: 'widgets/sunset-card', displayName: 'SunsetCard', registryItem: 'widget-leaf-sunset-card', Component: SunsetCardPreview, frame: { height: 360 }, args: [{ variant: 'Hosted service notice', initial: { serverUrl: HOSTED_SERVER_URL } }, { variant: 'Self-hosted service', initial: { serverUrl: null } }] });
