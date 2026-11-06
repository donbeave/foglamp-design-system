/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@tailrocks/framerock/ui/table";
import { defineStory } from "../../lib/story";

function TableStory({
  showFooter = true,
  dense = false,
}: {
  showFooter?: boolean;
  dense?: boolean;
}) {
  const [selected, setSelected] = useState("tr_002");
  const rows = [
    { id: "tr_001", model: "gpt-4.1", latency: 421 },
    { id: "tr_002", model: "claude-sonnet", latency: 876 },
    { id: "tr_003", model: "o4-mini", latency: 193 },
  ];
  const cellClass = dense ? "py-1.5 text-xs" : undefined;

  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <div className="max-h-72 w-full max-w-lg overflow-auto rounded-md shadow-(--custom-shadow)">
        <Table>
          <TableCaption>Recent model requests</TableCaption>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setSelected(row.id)}
                data-state={selected === row.id ? "selected" : undefined}
                className="cursor-pointer"
              >
                <TableCell className={cellClass}>{row.id}</TableCell>
                <TableCell className={cellClass}>{row.model}</TableCell>
                <TableCell className={`text-right ${cellClass ?? ""}`}>{row.latency} ms</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {showFooter ? (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Average latency</TableCell>
                <TableCell className="text-right">497 ms</TableCell>
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </div>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/table",
  registryItem: "ui-table",
  displayName: "Table",
  Component: TableStory,
  frame: { height: 320 },
  args: [
    { variant: "With footer", initial: { showFooter: true, dense: false } },
    { variant: "Dense rows", initial: { showFooter: false, dense: true } },
  ],
});
