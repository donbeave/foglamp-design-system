/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@tailrocks/framerock/ui/dialog';
import { Button } from '@tailrocks/framerock/ui/button';
import { Input } from '@tailrocks/framerock/ui/input';
import { Label } from '@tailrocks/framerock/ui/label';
import { defineStory } from '../../lib/story';
function DialogExample({ title = 'Create evaluation' }: { title?: string }) { return <Dialog><DialogTrigger render={<Button variant="outline" />}>New evaluation</DialogTrigger><DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Set up a reusable test run for your agent.</DialogDescription></DialogHeader><div className="grid gap-3"><Label htmlFor="eval-name">Name</Label><Input id="eval-name" defaultValue="Support agent regression" /><Label htmlFor="eval-dataset">Dataset</Label><Input id="eval-dataset" defaultValue="support-v3 · 128 cases" /></div><DialogFooter><DialogClose render={<Button variant="outline" />}>Cancel</DialogClose><Button>Create evaluation</Button></DialogFooter></DialogContent></Dialog>; }
export const story = defineStory({ id: 'primitives/dialog', registryItem: 'ui-dialog', displayName: 'Dialog', Component: DialogExample, args: [{ variant: 'Create evaluation', initial: { title: 'Create evaluation' } }, { variant: 'Edit monitor', initial: { title: 'Edit monitor' }}] });
