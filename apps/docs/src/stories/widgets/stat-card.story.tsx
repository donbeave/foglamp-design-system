/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { StatCard } from '@tailrocks/framerock/widgets/page-parts';
import { defineStory } from '../../lib/story';
function StatCardPreview({ label = 'Total runs', value = 1284, loading = false }: { label?: string; value?: number; loading?: boolean }) { return <div className="w-64"><StatCard label={label} value={value} delta={{ pct: 18, dir: 'up' }} loading={loading}/></div>; }
export const story = defineStory({ id: 'widgets/stat-card', displayName: 'StatCard', registryItem: 'widget-stat-card', Component: StatCardPreview, args: [{ variant: 'Trend up', initial: { label: 'Total runs', value: 1284 } }, { variant: 'Loading shell', initial: { label: 'Spend', value: 0, loading: true } }] });
