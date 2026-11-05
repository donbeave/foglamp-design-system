/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from '@foglamp/design-system/ui/combobox';
import { defineStory } from '../../lib/story';
const models = ['Claude 3.7 Sonnet', 'GPT-4.1', 'Gemini 2.5 Pro'];
function ComboboxExample({ placeholder = 'Choose a model…' }: { placeholder?: string }) { const [value, setValue] = useState<string | null>('GPT-4.1'); return <Combobox items={models} value={value} onValueChange={setValue}><ComboboxInput aria-label="Model" placeholder={placeholder} /><ComboboxContent><ComboboxList>{models.map((model) => <ComboboxItem key={model} value={model}>{model}</ComboboxItem>)}</ComboboxList><ComboboxEmpty>No models found.</ComboboxEmpty></ComboboxContent></Combobox>; }
export const story = defineStory({ id: 'primitives/combobox', registryItem: 'ui-combobox', displayName: 'Combobox', Component: ComboboxExample, args: [{ variant: 'Model selector', initial: { placeholder: 'Choose a model…' } }, { variant: 'Search models', initial: { placeholder: 'Search available models…' }}] });
