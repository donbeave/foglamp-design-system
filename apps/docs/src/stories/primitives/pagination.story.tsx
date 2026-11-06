/* Derived primitive story. Original design by Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (foglamp-labs/foglamp); Apache-2.0. */
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@tailrocks/framerock/ui/pagination";
import { defineStory } from "../../lib/story";

function PaginationStory({
  currentPage = 2,
  showEdges = true,
}: {
  currentPage?: number;
  showEdges?: boolean;
}) {
  return (
    <div className="flex min-h-24 w-full items-center justify-center p-4">
      <Pagination>
        <PaginationContent>
          {showEdges ? (
            <PaginationItem>
              <PaginationPrevious href="#previous" />
            </PaginationItem>
          ) : null}
          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href={`#${page}`} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {showEdges ? (
            <PaginationItem>
              <PaginationNext href="#next" />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export const story = defineStory({
  id: "primitives/pagination",
  registryItem: "ui-pagination",
  displayName: "Pagination",
  Component: PaginationStory,
  args: [
    { variant: "Default", initial: { currentPage: 2, showEdges: true } },
    { variant: "Compact", initial: { currentPage: 1, showEdges: false } },
  ],
});
