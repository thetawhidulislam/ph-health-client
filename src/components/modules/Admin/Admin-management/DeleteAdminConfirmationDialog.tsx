"use client";

import { deleteAdminAction } from "@/app/(dashboardLayout)/admin/dashboard/admins-management/_action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type IAdmin } from "@/types/admin.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteAdminConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: IAdmin | null;
  onSuccess: () => void;
}

const DeleteAdminConfirmationDialog = ({
  open,
  onOpenChange,
  admin,
  onSuccess,
}: DeleteAdminConfirmationDialogProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteAdminAction,
  });

  const handleConfirmDelete = async () => {
    if (!admin) {
      toast.error("Admin not found");
      return;
    }

    const result = await mutateAsync(String(admin.id));

    if (!result.success) {
      toast.error(result.message || "Failed to delete admin");
      return;
    }

    toast.success(result.message || "Admin deleted successfully");
    onOpenChange(false);
    onSuccess();
    void queryClient.invalidateQueries({ queryKey: ["admins"] });
    void queryClient.refetchQueries({ queryKey: ["admins"], type: "active" });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Admin</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Are you sure you want to delete {admin?.name ?? "this admin"}? This will soft-delete the admin and linked user account.
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAdminConfirmationDialog;
