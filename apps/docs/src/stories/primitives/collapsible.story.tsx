/* Derived story fixture by Foglamp Design System contributors. Original component design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs (foglamp-labs/foglamp), Apache-2.0. */
import { useEffect, useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@tailrocks/framerock/ui/collapsible';
import { Button } from '@tailrocks/framerock/ui/button';
import { defineStory } from '../../lib/story';
function CollapsibleExample({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md rounded-lg shadow-(--custom-shadow) p-4"><div className="flex items-center justify-between"><div><p className="font-medium">Evaluator details</p><p className="text-sm text-muted-foreground">3 configuration values</p></div><CollapsibleTrigger render={<Button variant="outline" size="sm" />}>{open ? 'Hide' : 'Show'}</CollapsibleTrigger></div><CollapsibleContent><dl className="mt-4 grid grid-cols-2 gap-2 text-sm"><dt className="text-muted-foreground">Model</dt><dd>gpt-4.1</dd><dt className="text-muted-foreground">Temperature</dt><dd>0.2</dd><dt className="text-muted-foreground">Max tokens</dt><dd>2048</dd></dl></CollapsibleContent></Collapsible>;
}
export const story = defineStory({ id: 'primitives/collapsible', registryItem: 'ui-collapsible', displayName: 'Collapsible', Component: CollapsibleExample, args: [{ variant: 'Initially open', initial: { defaultOpen: true } }, { variant: 'Initially closed', initial: { defaultOpen: false } }] });
