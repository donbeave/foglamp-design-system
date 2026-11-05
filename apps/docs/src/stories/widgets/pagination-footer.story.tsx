/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { PaginationFooter } from '@foglamp/design-system/widgets/data-table';
import { defineStory } from '../../lib/story';
function PaginationFooterPreview() { return <div className="w-full"><PaginationFooter page={1} pageSize={25} total={1284} shown={25} noun={['trace', 'traces']} onPageChange={() => undefined} onPageSizeChange={() => undefined}/></div>; }
export const story = defineStory({ id: 'widgets/pagination-footer', displayName: 'PaginationFooter', registryItem: 'widget-pagination-footer', Component: PaginationFooterPreview, args: [{ variant: 'Paged results', initial: {} }] });
