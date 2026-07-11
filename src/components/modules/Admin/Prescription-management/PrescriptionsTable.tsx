"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getPrescriptions } from "@/services/prescription.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { prescriptionsColumns } from "./prescriptionsColumn";
import ViewPrescriptionDialog from "./ViewPrescriptionDialog";
import { IPrescription } from "@/types/prescription.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const PrescriptionsTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IPrescription>({ enableEdit: false, enableDelete: false });

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({ searchParams, updateParams });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["prescription", queryString],
    queryFn: () => getPrescriptions(queryString),
  });

  const prescriptions = data?.data ?? [];

  return (
    <>
      <DataTable
        data={prescriptions as IPrescription[]}
        columns={prescriptionsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No prescriptions found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search prescriptions...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={data?.meta}
        actions={tableActions}
      />

      <ViewPrescriptionDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        prescription={viewingItem}
      />
    </>
  );
};

export default PrescriptionsTable;
