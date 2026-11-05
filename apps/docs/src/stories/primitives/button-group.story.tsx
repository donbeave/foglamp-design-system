/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { Button } from '@foglamp/design-system/ui/button';
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from '@foglamp/design-system/ui/button-group';
import { defineStory } from '../../lib/story';
function ButtonGroupExample({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) { return <ButtonGroup orientation={orientation} aria-label="Time range"><Button variant="outline" size="sm">1h</Button><Button variant="outline" size="sm">24h</Button><Button variant="secondary" size="sm">7d</Button><ButtonGroupSeparator /><ButtonGroupText>UTC</ButtonGroupText></ButtonGroup>; }
export const story = defineStory({ id: 'primitives/button-group', registryItem: 'ui-button-group', displayName: 'Button Group', Component: ButtonGroupExample, args: [{ variant: 'Horizontal', initial: { orientation: 'horizontal' } }, { variant: 'Vertical', initial: { orientation: 'vertical' } }] });
