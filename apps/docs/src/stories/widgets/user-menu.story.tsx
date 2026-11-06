/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { UserMenuView } from '@tailrocks/framerock/widgets/user-menu';
import { defineStory } from '../../lib/story';
function UserMenuPreview({ signedIn = true }: { signedIn?: boolean }) { return <UserMenuView session={signedIn ? { user: { email: 'jordan@acme.dev' } } : null} onSignOut={() => undefined}/>; }
export const story = defineStory({ id: 'widgets/user-menu', displayName: 'UserMenu', registryItem: 'widget-user-menu-view', Component: UserMenuPreview, frame: { height: 340 }, args: [{ variant: 'Signed in', initial: { signedIn: true } }, { variant: 'Signed out', initial: { signedIn: false } }] });
