/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { DeviceApproveBlock } from '@foglamp/design-system/blocks/auth/device-approve';
import { StorySurface } from './fixtures';
import { defineStory } from '../../lib/story';
function DeviceApproveStory({ initialUserCode }: { initialUserCode: string }) { return <StorySurface><DeviceApproveBlock initialUserCode={initialUserCode} userEmail="alex@example.com" onClaim={async () => ({ kind: 'pending' })} onDecision={async () => ({ kind: 'success' })} /></StorySurface>; }
export const story = defineStory({ id: 'blocks/device-approve-block', displayName: 'Device Approval', registryItem: 'block-auth-device-approve', Component: DeviceApproveStory, args: { initial: { initialUserCode: 'ABCD-1234' } } });
