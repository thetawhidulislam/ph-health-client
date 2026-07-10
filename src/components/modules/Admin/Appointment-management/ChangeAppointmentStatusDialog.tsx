"use client";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatusAction } from "@/app/(dashboardLayout)/admin/dashboard/appointments-management/_action";
import { IAppointment } from "@/types/appointment.types";
import { UserInfo } from "@/types/user.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ChangeAppointmentStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: IAppointment | null;
  currentUser?: UserInfo;
}

const STATUSES = ["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELED"];

const ChangeAppointmentStatusDialog = ({ open, onOpenChange, appointment, currentUser }: ChangeAppointmentStatusDialogProps) => {
  const [selected, setSelected] = useState<string>("SCHEDULED");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (opts: { id: string; status: string }) => {
      return await changeAppointmentStatusAction(opts.id, { status: opts.status });
    },
  });

  useEffect(() => {
    if (open) {
      setSelected(appointment?.status ?? "SCHEDULED");
    }
  }, [open, appointment]);

  const handleConfirm = async () => {
    if (!appointment) {
      toast.error("Appointment not found");
      return;
    }

    const result = await mutateAsync({ id: String(appointment.id), status: selected });

    if (!result.success) {
      toast.error(result.message || "Failed to update status");
      return;
    }

    toast.success(result.message || "Appointment status updated");
    onOpenChange(false);
    void queryClient.invalidateQueries({ queryKey: ["appointments"] });
    void queryClient.refetchQueries({ queryKey: ["appointments"], type: "active" });
    router.refresh();
  };

  const role = currentUser?.role;
  const userEmail = currentUser?.email;

  const computeAllowedStatuses = (): string[] => {
    if (!appointment) return [];

    // Admins can only view per new requirement
    if (role === "ADMIN" || role === "SUPER_ADMIN") return [];

    // If appointment is completed or canceled only doctor (owner) can update
    if (appointment.status === "COMPLETED" || appointment.status === "CANCELED") {
      if (role === "DOCTOR" && userEmail && appointment.doctor?.email === userEmail) return STATUSES;
      return [];
    }

    // Doctor-owned transitions
    if (role === "DOCTOR" && userEmail && appointment.doctor?.email === userEmail) {
      if (appointment.status === "SCHEDULED") return ["INPROGRESS", "CANCELED"];
      if (appointment.status === "INPROGRESS") return ["COMPLETED"];
      return [];
    }

    // Patient can cancel scheduled appointment
    if (role === "PATIENT" && userEmail && appointment.patient?.email === userEmail) {
      if (appointment.status === "SCHEDULED") return ["CANCELED"];
      return [];
    }

    return [];
  };

  const allowed = computeAllowedStatuses();

  const isUpdateAllowed = allowed.length > 0 && allowed.includes(selected);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Appointment Status</AlertDialogTitle>
          <AlertDialogDescription>
            Select a new status for this appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-4">
          <Select value={selected} onValueChange={(v) => setSelected(v ?? appointment?.status ?? "SCHEDULED")}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {allowed.length > 0 ? (
                allowed.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)
              ) : (
                <SelectItem key={appointment?.status ?? "none"} value={appointment?.status ?? ""} disabled>
                  {appointment?.status ?? "No available status"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {role === "ADMIN" || role === "SUPER_ADMIN" ? (
            <p className="mt-2 text-sm text-muted-foreground">Admins can only view appointments; status updates are restricted to the doctor or patient as allowed.</p>
          ) : allowed.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">You are not allowed to change the status for this appointment.</p>
          ) : null}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); void handleConfirm(); }} disabled={isPending || !isUpdateAllowed}>
            {isPending ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeAppointmentStatusDialog;
