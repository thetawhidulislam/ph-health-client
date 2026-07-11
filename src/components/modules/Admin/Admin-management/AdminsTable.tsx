"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { getAdmins } from "@/services/admin.service";
import { adminColumns } from "./adminsColumn";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import ViewAdminProfileDialog from "./ViewAdminProfileDialog";
import DeleteAdminConfirmationDialog from "./DeleteAdminConfirmationDialog";
import ChangeAdminDialog from "./ChangeAdminDialog";
import { PaginationMeta } from "@/types/api.types";
import { IAdmin } from "@/types/admin.types";

const AdminsTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    viewingItem,
    editingItem,
    deletingItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IAdmin>({ enableEdit: true });

  const queryString = initialQueryString || "";

  const { data: adminsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["admins", queryString],
    queryFn: () => getAdmins(queryString),
  });

  const admins = adminsResponse?.data ?? [];
  const meta: PaginationMeta | undefined = adminsResponse?.meta;

  const handleRefresh = async () => {
    void queryClient.invalidateQueries({ queryKey: ["admins"] });
    void queryClient.refetchQueries({ queryKey: ["admins"], type: "active" });
    router.refresh();
  };

  return (
    <>
      <DataTable
        data={admins}
        columns={adminColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No admins found."
        meta={meta}
        actions={tableActions}
      />

      <ViewAdminProfileDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        admin={viewingItem}
      />

      <DeleteAdminConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        admin={deletingItem}
        onSuccess={handleRefresh}
      />

      <ChangeAdminDialog
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        admin={editingItem}
        onSuccess={handleRefresh}
      />
    </>
  );
};

export default AdminsTable;
