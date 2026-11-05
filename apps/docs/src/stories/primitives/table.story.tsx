/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@tailrocks/framerock/ui/table";
import { defineStory } from "../../lib/story";

type Args = { variant: 'interactive' };
function TableStory({ args }: { args: Args }) {
  const [selected, setSelected] = useState("tr_002"); const rows = [{id:"tr_001",model:"gpt-4.1",latency:421},{id:"tr_002",model:"claude-sonnet",latency:876},{id:"tr_003",model:"o4-mini",latency:193}];
  return <div className="flex min-h-24 w-full items-center justify-center p-4"><div className="max-h-60 w-full overflow-auto rounded-md shadow-(--custom-shadow)"><Table><TableCaption>Recent model requests</TableCaption><TableHeader className="sticky top-0 bg-background"><TableRow><TableHead>Request</TableHead><TableHead>Model</TableHead><TableHead className="text-right">Latency</TableHead></TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row.id} onClick={() => setSelected(row.id)} data-state={selected === row.id ? "selected" : undefined} className="cursor-pointer"><TableCell>{row.id}</TableCell><TableCell>{row.model}</TableCell><TableCell className="text-right">{row.latency} ms</TableCell></TableRow>)}</TableBody></Table></div></div>;
}

export const story = defineStory({ id: "primitives/table", registryItem: "ui-table", displayName: "Table", Component: TableStory, args: [{ variant: "Default", initial: { args: { variant: 'interactive' } } }] });
