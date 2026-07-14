"use client";

import { getPatientByIdAction } from "@/app/(dashboardLayout)/admin/dashboard/patients-management/_action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type IPatient, type IPatientDetails } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface ViewPatientProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.getTime())) return "N/A";
  return format(dateValue, "MMM dd, yyyy hh:mm a");
};

const ViewPatientProfileDialog = ({
  open,
  onOpenChange,
  patient,
}: ViewPatientProfileDialogProps) => {
  const patientId = patient ? String(patient.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["patient-details", patientId],
    queryFn: () => getPatientByIdAction(patientId),
    enabled: open && patientId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const patientDetails =
    data && data.success ? (data.data as IPatientDetails) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-full gap-0 overflow-hidden p-0 sm:max-h-screen sm:max-w-2xl md:max-w-3xl">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Patient Profile</DialogTitle>
          <DialogDescription>
            Profile view with patient info and account details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-4 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Loading patient details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load patient details."}
              </div>
            )}

            {!isLoading && !isFetching && patientDetails && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-sm font-semibold">Patient Info</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {patientDetails.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {patientDetails.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>{" "}
                        {patientDetails.contactNumber || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {patientDetails.address || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-sm font-semibold">User Account</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">User Name:</span>{" "}
                        {patientDetails.user?.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">User Email:</span>{" "}
                        {patientDetails.user?.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Role:</span>{" "}
                        {patientDetails.user?.role || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {patientDetails.user?.status || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDateTime(patientDetails.user?.createdAt)}
                      </p>
                      <p>
                        <span className="font-medium">Updated:</span>{" "}
                        {formatDateTime(patientDetails.user?.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPatientProfileDialog;
