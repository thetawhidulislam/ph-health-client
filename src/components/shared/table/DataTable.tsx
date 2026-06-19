"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";

interface DataTableAction<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableAction<TData>;
  emptyMesssage?: string;
  isLoading?: boolean;
  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    total?: number;
    pageSizeOptions?: number[];
    onPageChange: (pageIndex: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  search?: {
    value: string;
    onSearchChange: (value: string) => void;
    onSearchClear: () => void;
    placeholder?: string;
    disabled?: boolean;
    debounceMs?: number;
  };
}

const DataTable = <TData,>({
  data,
  columns,
  actions,
  emptyMesssage,
  isLoading,
  sorting,
  pagination,
  search,
}: DataTableProps<TData>) => {
  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-full border border-transparent bg-transparent text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions.onView && (
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      View
                    </DropdownMenuItem>
                  )}
                  {actions.onEdit && (
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      Edit
                    </DropdownMenuItem>
                  )}
                  {actions.onDelete && (
                    <DropdownMenuItem
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: !!sorting,
    manualPagination: !!pagination,
    pageCount: pagination?.pageCount,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
      ...(pagination
        ? {
            pagination: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            },
          }
        : {}),
    },
    onSortingChange: sorting
      ? (updater) => {
          const currentSortingState = sorting.state;
          const nextSortingState =
            typeof updater === "function"
              ? updater(currentSortingState)
              : updater;
          sorting.onSortingChange(nextSortingState);
        }
      : undefined,
    onPaginationChange: pagination
      ? (updater) => {
          const currentPagination = {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          };
          const nextPagination =
            typeof updater === "function"
              ? updater(currentPagination)
              : updater;

          if (nextPagination.pageIndex !== pagination.pageIndex) {
            pagination.onPageChange(nextPagination.pageIndex);
          }
          if (nextPagination.pageSize !== pagination.pageSize) {
            pagination.onPageSizeChange(nextPagination.pageSize);
          }
        }
      : undefined,
  });
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}
      {search ? (
        <div className="mb-4 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TableSearch
            key={search.value || "table-search"}
            value={search.value}
            onSearchChange={search.onSearchChange}
            onSearchClear={search.onSearchClear}
            placeholder={search.placeholder}
            disabled={search.disabled}
          />
        </div>
      ) : null}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant={"ghost"}
                        className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rowModel.rows.length ? (
              rowModel.rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableHead key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableHead
                  colSpan={tableColumns.length}
                  className="text-center"
                >
                  {emptyMesssage || "No data available."}
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <TablePagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          pageCount={pagination.pageCount}
          total={pagination.total}
          pageSizeOptions={pagination.pageSizeOptions}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
};

export default DataTable;
