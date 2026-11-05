/* Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { SetupBoardBlock } from '@foglamp/design-system/blocks/setup/setup-board';
import { ScanFaviconProvider } from '@foglamp/design-system/blocks/scan/favicon-context';
import type { PlanEdits } from '@foglamp/design-system/lib/scan/instrumentation';
import { defineStory } from '../../lib/story';
import { planFixture, resolveStoryFavicon } from './fixtures';
function SetupPlanEditsStory({ approving }: { approving: boolean }) { const [status, setStatus] = useState<'awaiting_approval' | 'approved' | 'rejected'>('awaiting_approval'); const [, setEdits] = useState<PlanEdits | undefined>(); return <ScanFaviconProvider resolve={resolveStoryFavicon}><SetupBoardBlock plan={planFixture} status={status} approving={approving} onApprove={edits => { setEdits(edits); setStatus('approved'); }} onReject={() => setStatus('rejected')} /></ScanFaviconProvider>; }
export const story = defineStory({ id: 'blocks/setup-board-block', displayName: 'Setup Board · Plan Edits', registryItem: 'block-setup-setup-board', Component: SetupPlanEditsStory, args: { initial: { approving: false } }, frame: { width: 1280, height: 800 } });
