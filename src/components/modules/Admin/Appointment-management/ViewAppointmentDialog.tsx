"use client";

import { getAppointmentByIdAction } from "@/app/(dashboardLayout)/admin/dashboard/appointments-management/_action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type IAppointment } from "@/types/appointment.types";
import { useQuery } from "@tanstack/react-query";
import DateCell from "@/components/shared/cell/DateCell";

interface ViewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: IAppointment | null;
}



const ViewAppointmentDialog = ({
  open,
  onOpenChange,
  appointment,
}: ViewAppointmentDialogProps) => {
  const id = appointment ? String(appointment.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["appointment-details", id],
    queryFn: () => getAppointmentByIdAction(id),
    enabled: open && id.length > 0,
  });

  const hasError = data && !data.success;
  const appt = data && data.success ? data.data : appointment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,78rem)]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            View appointment, schedule, doctor and patient information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-4">
          {(isLoading || isFetching) && <div>Loading appointment...</div>}

          {hasError && <div className="text-destructive">{data.message}</div>}

          {!isLoading && appt && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Basic</h3>
                <p>
                  <span className="font-medium">ID:</span> {appt.id}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {appt.status}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {appt.paymentStatus}
                </p>
                <p>
                  <span className="font-medium">Created:</span>{" "}
                  <DateCell
                    date={appt.createdAt}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Doctor</h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {appt.doctor?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {appt.doctor?.email ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Fee:</span>{" "}
                  {appt.doctor?.appointmentFee ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Patient</h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {appt.patient?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {appt.patient?.email ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Schedule</h3>
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  <DateCell
                    date={appt.schedule?.startDateTime}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
                <p>
                  <span className="font-medium">End:</span>{" "}
                  <DateCell
                    date={appt?.schedule?.endDateTime}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAppointmentDialog;
