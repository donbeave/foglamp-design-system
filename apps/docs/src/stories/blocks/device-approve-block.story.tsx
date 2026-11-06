/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { DeviceApproveBlock } from '@tailrocks/framerock/blocks/auth/device-approve';
import { StorySurface } from './fixtures';
import { defineStory } from '../../lib/story';
function DeviceApproveStory({ initialUserCode = 'ABCD-1234' }: { initialUserCode?: string }) { return <StorySurface><div className="flex w-full justify-center"><DeviceApproveBlock key={initialUserCode} initialUserCode={initialUserCode} userEmail="alex@example.com" onClaim={async () => ({ kind: 'pending' })} onDecision={async () => ({ kind: 'success' })} /></div></StorySurface>; }
export const story = defineStory({ id: 'blocks/device-approve-block', displayName: 'Device Approval', registryItem: 'block-auth-device-approve', Component: DeviceApproveStory, frame: { width: 1040, height: 520 }, args: [{ variant: 'Default', initial: { initialUserCode: 'ABCD-1234' } }, { variant: 'Secondary device', initial: { initialUserCode: 'WXYZ-9876' } }] });
