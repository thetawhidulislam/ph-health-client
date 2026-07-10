"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getAllAppointments } from "@/services/appointment.services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { appointmentColumns } from "./appointmentsColumn";
import { IAppointment } from "@/types/appointment.types";

import { UserInfo } from "@/types/user.types";
import ChangeAppointmentStatusDialog from "./ChangeAppointmentStatusDialog";
import ViewAppointmentDialog from "./ViewAppointmentDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const AppointmentsTable = ({
  initialQueryString,
  currentUser,
}: {
  initialQueryString: string;
  currentUser?: UserInfo;
}) => {
  const searchParams = useSearchParams();

  const {
    viewingItem,
    editingItem,
    isViewDialogOpen,
    isEditModalOpen,
    onViewOpenChange,
    onEditOpenChange,
    tableActions,
  } = useRowActionModalState<IAppointment>();

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
    queryKey: ["appointments", queryString],
    queryFn: () => getAllAppointments(queryString),
  });

  const appointments = data?.data ?? [];

  return (
    <>
      <DataTable
        data={appointments}
        columns={appointmentColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No appointments found."
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
          placeholder: "Search appointments...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={data?.meta}
        actions={tableActions}
      />

      <ChangeAppointmentStatusDialog
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        appointment={editingItem}
        currentUser={currentUser}
      />

      <ViewAppointmentDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        appointment={viewingItem}
      />
    </>
  );
};

export default AppointmentsTable;
