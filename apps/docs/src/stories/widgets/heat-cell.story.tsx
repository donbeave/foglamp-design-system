/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Table, TableBody, TableCell, TableRow } from '@tailrocks/framerock/ui/table';
import { HeatCell } from '@tailrocks/framerock/widgets/heat-cell';
import { defineStory } from '../../lib/story';
function HeatCellPreview() { return <Table className="w-72"><TableBody><TableRow><TableCell>Fastest</TableCell><HeatCell value={42} thresholds={[80, 160, 280, 500]} metric="duration">42 ms</HeatCell></TableRow><TableRow><TableCell>Slowest</TableCell><HeatCell value={720} thresholds={[80, 160, 280, 500]} metric="duration" bold>720 ms</HeatCell></TableRow></TableBody></Table>; }
export const story = defineStory({ id: 'widgets/heat-cell', displayName: 'HeatCell', registryItem: 'widget-heat-cell', Component: HeatCellPreview, args: [{ variant: 'Latency percentiles', initial: {} }] });
