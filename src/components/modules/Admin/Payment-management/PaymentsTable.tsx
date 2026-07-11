"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getPayments } from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { paymentsColumns } from "./paymentsColumn";
import { IAppointment } from "@/types/appointment.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const PaymentsTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

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
    queryKey: ["payment", queryString],
    queryFn: () => getPayments(queryString),
  });

  const payments = data?.data ?? [];

  return (
    <DataTable
      data={payments as IAppointment[]}
      columns={paymentsColumns}
      isLoading={isLoading || isFetching || isRouteRefreshPending}
      emptyMessage="No payment records found."
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
        placeholder: "Search payments...",
        debounceMs: 700,
        onDebouncedChange: handleDebouncedSearchChange,
      }}
      meta={data?.meta}
    />
  );
};

export default PaymentsTable;
