/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { useState } from 'react';
import { Checkbox } from '@foglamp/design-system/ui/checkbox';
import { Field, FieldLabel, FieldDescription } from '@foglamp/design-system/ui/field';
import { defineStory } from '../../lib/story';
function CheckboxExample({ disabled = false }: { disabled?: boolean }) { const [checked, setChecked] = useState(true); return <Field orientation="horizontal" data-disabled={disabled}><Checkbox id="include-retries" checked={checked} onCheckedChange={setChecked} disabled={disabled} /><div><FieldLabel htmlFor="include-retries">Include retry attempts</FieldLabel><FieldDescription>Count retries as separate evaluation requests.</FieldDescription></div></Field>; }
export const story = defineStory({ id: 'primitives/checkbox', registryItem: 'ui-checkbox', displayName: 'Checkbox', Component: CheckboxExample, args: [{ variant: 'Checked', initial: { disabled: false } }, { variant: 'Disabled', initial: { disabled: true } }] });
