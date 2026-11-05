/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { QuotaCardView } from '@tailrocks/framerock/widgets/quota-card';
import { defineStory } from '../../lib/story';
function QuotaCardPreview({ pct = 0.94 }: { pct?: number }) { return <div className="w-64"><QuotaCardView usage={{ spans: { pct } }}/></div>; }
export const story = defineStory({ id: 'widgets/quota-card', displayName: 'QuotaCard', registryItem: 'widget-quota-card-view', Component: QuotaCardPreview, args: [{ variant: 'Near quota', initial: { pct: 0.94 } }, { variant: 'Exceeded', initial: { pct: 1.12 } }] });
