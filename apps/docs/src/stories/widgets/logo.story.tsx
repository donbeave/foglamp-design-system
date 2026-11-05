/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { Logo } from '@foglamp/design-system/icons/logo';
import { defineStory } from '../../lib/story';
function LogoPreview() { return <Logo className="h-8 w-auto"/>; }
export const story = defineStory({ id: 'widgets/logo', displayName: 'Logo', registryItem: 'icon-logo', Component: LogoPreview, args: [{ variant: 'Wordmark', initial: {} }] });
