"use client";
import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DataTable from "@/components/shared/table/DataTable";

import { getDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";

import { ApiResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { doctorColumns } from "./doctorsColumn";

const DoctorsTable = ({ queryString }: { queryString: string }) => {
  // const doctorColumns: ColumnDef<IDoctor>[] = [
  //   { accessorKey: "name", header: "Name" },
  //   { accessorKey: "specialization", header: "Specialization" },
  //   { accessorKey: "experience", header: "Experience" },
  //   { accessorKey: "rating", header: "Rating" },
  // ];

  const handleView = (doctor: IDoctor) => {
    // Implement view logic here
    console.log("View doctor:", doctor);
  };
  const handleEdit = (doctor: IDoctor) => {
    // Implement edit logic here
    console.log("Edit doctor:", doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    // Implement delete logic here
    console.log("Delete doctor:", doctor);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQueryString = searchParams.toString() || queryString;

  const [queryStringState, setQueryStringState] = useState<string>(initialQueryString);

  const effectiveQueryString = queryStringState;
  const effectiveSearchParams = useMemo(
    () => new URLSearchParams(effectiveQueryString),
    [effectiveQueryString],
  );

  const sortBy = effectiveSearchParams.get("sortBy");
  const sortOrder = effectiveSearchParams.get("sortOrder");
  const page = Math.max(1, Number(effectiveSearchParams.get("page") || "1"));
  const limit = Math.max(1, Number(effectiveSearchParams.get("limit") || "10"));

  const sortingState = useMemo(() => {
    if (!sortBy) {
      return [] as SortingState;
    }

    return [
      {
        id: sortBy,
        desc: sortOrder === "desc",
      },
    ];
  }, [sortBy, sortOrder]);

  const pageIndex = page - 1;
  const pageSize = limit;

  const navigateToDestination = (destination: string) => {
    if (typeof window !== "undefined") {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (currentPath !== destination) {
        window.history.replaceState(null, "", destination);
      }
    }

    setQueryStringState(destination.replace(/^[^?]*\??/, ""));
  };

  const handleSortingChange = (nextState: SortingState) => {
    const nextParams = new URLSearchParams(queryStringState);

    if (nextState.length === 0) {
      nextParams.delete("sortBy");
      nextParams.delete("sortOrder");
    } else {
      const nextSort = nextState[0];
      nextParams.set("sortBy", String(nextSort.id));
      nextParams.set("sortOrder", nextSort.desc ? "desc" : "asc");
    }

    const destination = `${pathname}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;
    void navigateToDestination(destination);
  };

  const handlePageChange = (nextPageIndex: number) => {
    const nextParams = new URLSearchParams(queryStringState);
    nextParams.set("page", String(nextPageIndex + 1));

    const destination = `${pathname}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;
    void navigateToDestination(destination);
  };

  const handlePageSizeChange = (nextSize: number) => {
    const nextParams = new URLSearchParams(queryStringState);
    nextParams.set("limit", String(nextSize));
    nextParams.set("page", "1");

    const destination = `${pathname}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;
    void navigateToDestination(destination);
  };

  const { data: doctorsResponseRaw, isFetching, isLoading } = useQuery<ApiResponse<IDoctor[]>>({
    queryKey: ["doctors", effectiveQueryString],
    queryFn: () => getDoctors(effectiveQueryString),
    staleTime: 1000 * 60,
  });
  const doctorsResponse = doctorsResponseRaw as ApiResponse<IDoctor[]> | undefined;
  const doctors = doctorsResponse?.data || [];
  const meta = doctorsResponse?.meta;
  const pageCount = meta?.totalPage ?? Math.max(1, Math.ceil((meta?.total ?? 0) / pageSize));
  const tableLoading = isLoading || isFetching;

  return (
    <div className="relative">
      {tableLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            Loading...
          </div>
        </div>
      )}
      <DataTable
        data={doctors || []}
        columns={doctorColumns}
        emptyMesssage="No doctors found."
        isLoading={tableLoading}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
        sorting={{
          state: sortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          pageIndex,
          pageSize,
          pageCount,
          total: meta?.total,
          pageSizeOptions: [1, 10, 20, 30, 50, 100],
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </div>
  );
};

export default DoctorsTable;
