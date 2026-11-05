/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { Input } from '@foglamp/design-system/ui/input';
import { Label } from '@foglamp/design-system/ui/label';
import { defineStory } from '../../lib/story';
function InputExample({ type = 'text', placeholder = 'Project name' }: { type?: 'text' | 'email' | 'search'; placeholder?: string }) { return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="input-demo">{type === 'email' ? 'Notification email' : type === 'search' ? 'Search traces' : 'Project name'}</Label><Input id="input-demo" type={type} placeholder={placeholder} defaultValue={type === 'text' ? 'Support Agent' : undefined} /></div>; }
export const story = defineStory({ id: 'primitives/input', registryItem: 'ui-input', displayName: 'Input', Component: InputExample, args: [{ variant: 'Text', initial: { type: 'text', placeholder: 'Project name' } }, { variant: 'Email', initial: { type: 'email', placeholder: 'you@example.com' } }, { variant: 'Search', initial: { type: 'search', placeholder: 'Search traces…' }}] });
