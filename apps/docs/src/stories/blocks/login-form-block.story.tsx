/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { LoginFormBlock } from '@tailrocks/framerock/blocks/auth/login-form';
import type { LoginFormCompletion } from '@tailrocks/framerock/blocks/auth/login-form';
import { useState } from 'react';
import { StorySurface } from './fixtures';
import { defineStory } from '../../lib/story';
function LoginFormStory({ magicLink }: { magicLink: boolean }) { const [done, setDone] = useState<LoginFormCompletion | null>(null); return <StorySurface><div className="mx-auto max-w-md">{done ? <p role="status" className="rounded-xl bg-muted p-4">Local demo signed in with {done.method}.</p> : <LoginFormBlock methods={{ emailPassword: true, magicLink, google: true }} onSignedIn={setDone} />}</div></StorySurface>; }
export const story = defineStory({ id: 'blocks/login-form-block', displayName: 'Login Form', registryItem: 'block-auth-login-form', Component: LoginFormStory, args: { initial: { magicLink: true } } });
