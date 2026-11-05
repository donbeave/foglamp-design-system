/* Derived reference story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs. */
import { useState } from 'react';
import { Conversation, DrawerColumns, DrawerRow, ExpandChevron, Meta } from '@tailrocks/framerock/widgets/run-exchange';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tailrocks/framerock/ui/table';
import { defineStory } from '../../lib/story';

const input = JSON.stringify([
  { role: 'user', content: 'I am migrating a support workflow to a new API key. Can you check the rollout plan?' },
  { role: 'assistant', content: 'Share the order of the deployment steps and I will check for gaps.' },
  { role: 'user', content: 'We created the replacement key, updated the first worker, and confirmed it can read the project. We still need to update the second worker and the scheduled invoice job.' },
  { role: 'assistant', content: 'Keep the previous key active until each worker and the scheduled job completes a successful request using the replacement.' },
  { role: 'user', content: [
    'Here is the full rollout record for the second review. The replacement credential was created in the production workspace and saved to the approved secrets manager. The first worker picked it up during its normal deployment and passed its health check, project lookup, and a read-only trace query.',
    'The second worker runs in a separate region and uses a different deployment pipeline. Its configuration has been updated, but it has not restarted yet. The scheduled invoice job runs hourly, reads credentials from its own environment, and writes a completion event after it reconciles each customer account. That job has not run since the key was changed.',
    'We will restart the second worker during the next low-traffic window, then verify its health check and one representative request. We will wait for the invoice job to complete successfully, inspect its event record, and confirm that its request uses the replacement credential. We will compare the request timestamps with the deployment log so we know which version of the environment each process used.',
    'After those checks, we plan to revoke the previous key, watch authentication errors and request failures for the next hour, and search the audit log for any calls that still reference the old credential. If a service still uses it, we will restore the previous secret temporarily, update that service, and repeat the validation before revoking again. Does this order leave any production service unverified?',
  ].join('\n\n') },
]);
const output = JSON.stringify([
  { role: 'assistant', content: [
    'Do not revoke the previous key yet. The first worker is verified, but the second worker and the scheduled invoice job have not both completed a request with the replacement credential.',
    'Restart the second worker during the planned low-traffic window. Confirm its health check, project lookup, and representative request succeed. Then wait for the invoice job’s next hourly run and verify its completion event and credential in the audit record.',
    'Once both services are confirmed, revoke the previous key. Monitor authentication errors and failed requests for at least one job interval, then search the audit log for calls attributed to the old credential. Keep the deployment and verification timestamps with the change record.',
    'If any request still uses the previous key, identify the owning process, update its secret reference, and repeat the health check and representative request before completing the rotation.',
  ].join('\n\n') },
]);

function RunExchangePreview({ clamp = 240, emptyResponse = false, drawerOpen: initialDrawerOpen = true }: { clamp?: number; emptyResponse?: boolean; drawerOpen?: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(initialDrawerOpen);
  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-card">
      <Table>
        <TableHeader><TableRow><TableHead>Run</TableHead><TableHead>Status</TableHead><TableHead align="right">Started</TableHead></TableRow></TableHeader>
        <TableBody>
          <TableRow className="group">
            <TableCell><button type="button" aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)} className="flex items-center gap-2 text-left font-medium"><ExpandChevron open={drawerOpen} /><span>Support assistant · tr_01HZXA29</span></button></TableCell>
            <TableCell>Completed</TableCell><TableCell align="right" className="text-muted-foreground">10:02:14 AM</TableCell>
          </TableRow>
          {drawerOpen && <DrawerRow colSpan={3}>
            <DrawerColumns overview={<div className="grid grid-cols-2 gap-x-5 gap-y-4 lg:w-88"><Meta label="Project" value="Production" /><Meta label="Model" value="gpt-4o" /><Meta label="Duration" value="2.4s" /><Meta label="Total cost" value="$0.0042" /></div>}>
              <Conversation input={input} output={emptyResponse ? null : output} emptyHint="No response was recorded for this run." clamp={clamp} />
            </DrawerColumns>
          </DrawerRow>}
        </TableBody>
      </Table>
    </div>
  );
}

export const story = defineStory({
  id: 'widgets/run-exchange',
  displayName: 'RunExchange',
  registryItem: 'widget-run-exchange',
  Component: RunExchangePreview,
  args: [
    { variant: 'Expanded run drawer with long folded exchange', initial: { clamp: 240, emptyResponse: false, drawerOpen: true } },
    { variant: 'Expanded exchange', initial: { clamp: 0, emptyResponse: false, drawerOpen: true } },
    { variant: 'Missing response state', initial: { clamp: 240, emptyResponse: true, drawerOpen: true } },
    { variant: 'Collapsed run row', initial: { clamp: 240, emptyResponse: false, drawerOpen: false } },
  ],
});
