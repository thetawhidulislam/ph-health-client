"use client";

import { banPatientAction, unbanPatientAction } from "@/app/(dashboardLayout)/admin/dashboard/patients-management/_action";
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
import { type IPatient } from "@/types/patient.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BanPatientConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}

const BanPatientConfirmationDialog = ({ open, onOpenChange, patient }: BanPatientConfirmationDialogProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isCurrentlyActive = patient?.user?.status === "ACTIVE";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return isCurrentlyActive ? banPatientAction(id) : unbanPatientAction(id);
    },
  });

  const handleConfirm = async () => {
    if (!patient) {
      toast.error("Patient not found");
      return;
    }

    const result = await mutateAsync(String(patient.id));

    if (!result.success) {
      toast.error(result.message || "Failed to update patient status");
      return;
    }

    toast.success(result.message || (isCurrentlyActive ? "Patient banned" : "Patient unbanned"));
    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["patients"] });
    void queryClient.refetchQueries({ queryKey: ["patients"], type: "active" });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isCurrentlyActive ? "Ban Patient" : "Unban Patient"}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {isCurrentlyActive ? "ban" : "unban"} {patient?.name ?? "this patient"}?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(e) => { e.preventDefault(); void handleConfirm(); }}
            disabled={isPending}
          >
            {isPending ? (isCurrentlyActive ? "Banning..." : "Unbanning...") : (isCurrentlyActive ? "Ban" : "Unban")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BanPatientConfirmationDialog;
