/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { DirectionProvider, useDirection } from '@foglamp/design-system/ui/direction';
import { Button } from '@foglamp/design-system/ui/button';
import { defineStory } from '../../lib/story';
function DirectionContent() { const direction = useDirection(); return <div dir={direction} className="grid gap-3"><p className="text-sm">Current direction: <strong>{direction}</strong></p><div className="flex gap-2"><Button variant="outline">Previous</Button><Button>Continue</Button></div></div>; }
function DirectionExample({ direction = 'ltr' }: { direction?: 'ltr' | 'rtl' }) { return <DirectionProvider direction={direction}><DirectionContent /></DirectionProvider>; }
export const story = defineStory({ id: 'primitives/direction', registryItem: 'ui-direction', displayName: 'Direction Provider', Component: DirectionExample, args: [{ variant: 'Left to right', initial: { direction: 'ltr' } }, { variant: 'Right to left', initial: { direction: 'rtl' }}] });
