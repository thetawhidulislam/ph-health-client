"use client";

import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  total?: number;
  pageSizeOptions?: number[];
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const defaultPageSizeOptions = [10, 20, 30, 50, 100];

const createPageItems = (pageCount: number, currentPage: number) => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const left = Math.max(2, currentPage - 2);
  const right = Math.min(pageCount - 1, currentPage + 2);
  const range: Array<number | string> = [1];

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i += 1) {
    range.push(i);
  }

  if (right < pageCount - 1) {
    range.push("...");
  }

  range.push(pageCount);
  return range;
};

const TablePagination = ({
  pageIndex,
  pageSize,
  pageCount,
  total,
  pageSizeOptions = defaultPageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  const pageIndexNumber = Number(pageIndex);
  const pageInputKey = `${pageIndexNumber + 1}-${pageCount}`;
  const pageInputRef = useRef<HTMLInputElement>(null);

  const pageItems = useMemo(
    () => createPageItems(pageCount, pageIndexNumber + 1),
    [pageCount, pageIndexNumber],
  );

  const handleInputSubmit = () => {
    const inputValue = pageInputRef.current?.value;
    const nextPage = Number(inputValue);

    if (Number.isFinite(nextPage) && nextPage >= 1 && nextPage <= pageCount) {
      onPageChange(nextPage - 1);
    } else if (pageInputRef.current) {
      pageInputRef.current.value = String(pageIndexNumber + 1);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pageIndex === 0}
          onClick={() => onPageChange(pageIndex - 1)}
        >
          Prev
        </Button>

        {pageItems.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-9 min-w-8 items-center justify-center rounded-md bg-muted px-2 text-sm text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNumber: number = typeof item === "number" ? item : Number(item);
          const isActive = pageNumber === pageIndexNumber + 1;

          return (
            <Button
              key={`page-${item}`}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNumber - 1)}
            >
              {item}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={pageIndexNumber >= pageCount - 1}
          onClick={() => onPageChange(pageIndexNumber + 1)}
        >
          Next
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-9 rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Go to</span>
          <Input
            key={pageInputKey}
            ref={pageInputRef}
            type="number"
            min={1}
            max={pageCount}
            defaultValue={pageIndexNumber + 1}
            onBlur={handleInputSubmit}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleInputSubmit();
              }
            }}
            className="w-20"
          />
        </div>

        <div className="flex items-center gap-1">
          <span>{pageIndexNumber + 1}</span>
          <span>/</span>
          <span>{pageCount}</span>
        </div>

        {typeof total === "number" && (
          <span className="text-sm text-muted-foreground">
            Total {total} items
          </span>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
