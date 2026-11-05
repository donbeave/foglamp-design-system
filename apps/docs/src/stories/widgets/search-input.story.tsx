/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { SearchInput } from '@foglamp/design-system/widgets/data-table';
import { defineStory } from '../../lib/story';
function SearchInputPreview({ placeholder = 'Search traces…' }: { placeholder?: string }) { const [value, setValue] = useState('support'); return <SearchInput value={value} onChange={setValue} placeholder={placeholder}/>; }
export const story = defineStory({ id: 'widgets/search-input', displayName: 'SearchInput', registryItem: 'widget-search-input', Component: SearchInputPreview, args: [{ variant: 'Search with clear action', initial: { placeholder: 'Search traces…' } }] });
