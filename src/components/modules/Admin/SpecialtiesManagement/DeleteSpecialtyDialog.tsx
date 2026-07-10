"use client";

import { deleteSpecialityAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ISpecialty } from "@/types/speciality.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteSpecialtyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialty: ISpecialty | null;
}

const DeleteSpecialtyDialog = ({
  open,
  onOpenChange,
  specialty,
}: DeleteSpecialtyDialogProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteSpecialityAction,
  });

  const handleConfirmDelete = async () => {
    if (!specialty) {
      toast.error("Specialty not found");
      return;
    }

    const result = await deleteMutation.mutateAsync(specialty.id);

    if (!result.success) {
      toast.error(result.message || "Unable to delete specialty");
      return;
    }

    toast.success(result.message || "Specialty deleted successfully");
    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["specialties"] });
    void queryClient.refetchQueries({ queryKey: ["specialties"], type: "active" });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Specialty</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {specialty?.title ?? "this specialty"}?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSpecialtyDialog;
