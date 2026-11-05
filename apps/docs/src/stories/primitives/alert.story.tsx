/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { Alert, AlertTitle, AlertDescription } from '@foglamp/design-system/ui/alert';
import { Badge } from '@foglamp/design-system/ui/badge';
import { defineStory } from '../../lib/story';
function AlertExample({ variant = 'default' }: { variant?: 'default' | 'destructive' }) { return <Alert variant={variant}><AlertTitle>{variant === 'destructive' ? 'Run failed' : 'Deployment complete'}</AlertTitle><AlertDescription>{variant === 'destructive' ? 'The evaluator returned a non-zero status.' : 'Production is serving release v2.8.1.'}</AlertDescription></Alert>; }
export const story = defineStory({ id: 'primitives/alert', registryItem: 'ui-alert', displayName: 'Alert', Component: AlertExample, args: [{ variant: 'Informational', initial: { variant: 'default' } }, { variant: 'Destructive', initial: { variant: 'destructive' } }] });
