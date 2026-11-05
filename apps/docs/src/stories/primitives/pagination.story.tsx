/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@tailrocks/framerock/ui/pagination";
import { defineStory } from "../../lib/story";

type Args = { variant: 'default' };
function PaginationStory({ args }: { args: Args }) {

  return <div className="flex min-h-24 w-full items-center justify-center p-4"><Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#previous" /></PaginationItem><PaginationItem><PaginationLink href="#1" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#2">2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#3">3</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#next" /></PaginationItem></PaginationContent></Pagination></div>;
}

export const story = defineStory({ id: "primitives/pagination", registryItem: "ui-pagination", displayName: "Pagination", Component: PaginationStory, args: [{ variant: "Default", initial: { args: { variant: 'default' } } }] });
