"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getSpecialities } from "@/services/speciality.service";
import { PaginationMeta } from "@/types/api.types";
import { ISpecialty } from "@/types/speciality.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeleteSpecialtyDialog from "./DeleteSpecialtyDialog";
import SpecialtyFormDialog from "./SpecialtyFormDialog";
import { specialtiesColumns } from "./specialtiesColumns";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const SpecialtiesTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    editingItem,
    deletingItem,
    isEditModalOpen,
    isDeleteDialogOpen,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<ISpecialty>({ enableView: false });

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
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["specialties", queryString],
    queryFn: () => getSpecialities(queryString),
  });

  const specialties = data?.data ?? [];
  const meta: PaginationMeta | undefined = data?.meta;

  return (
    <>
      <DataTable
        data={specialties}
        columns={specialtiesColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No specialties found."
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
          placeholder: "Search specialties...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={meta}
        actions={tableActions}
        toolbarAction={
          <Button type="button" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="size-4" />
            Create Specialty
          </Button>
        }
      />

      <SpecialtyFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
      />

      <SpecialtyFormDialog
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        specialty={editingItem}
        mode="edit"
      />

      <DeleteSpecialtyDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        specialty={deletingItem}
      />
    </>
  );
};

export default SpecialtiesTable;
