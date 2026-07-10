"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DateCell from "@/components/shared/cell/DateCell";
import { IPrescription } from "@/types/prescription.types";

interface ViewPrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: IPrescription | null;
}

const ViewPrescriptionDialog = ({
  open,
  onOpenChange,
  prescription,
}: ViewPrescriptionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,78rem)]">
        <DialogHeader>
          <DialogTitle>Prescription Details</DialogTitle>
          <DialogDescription>
            View the prescription, doctor, patient, and appointment information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-4">
          {!prescription ? (
            <div className="text-muted-foreground">No prescription selected.</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Prescription</h3>
                <p>
                  <span className="font-medium">ID:</span> {prescription.id}
                </p>
                <p>
                  <span className="font-medium">Instructions:</span>{" "}
                  {prescription.instructions || "None"}
                </p>
                <p>
                  <span className="font-medium">Follow-up date:</span>{" "}
                  <DateCell
                    date={prescription.followUpDate}
                    formatString="MMM dd, yyyy"
                  />
                </p>
                <p>
                  <span className="font-medium">Issued:</span>{" "}
                  <DateCell
                    date={prescription.createdAt}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
                <p>
                  <span className="font-medium">Updated:</span>{" "}
                  <DateCell
                    date={prescription.updatedAt}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
                <p>
                  <span className="font-medium">PDF:</span>{" "}
                  {prescription.pdfUrl ? (
                    <a
                      href={prescription.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Download prescription
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Unavailable</span>
                  )}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Doctor</h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {prescription.doctor?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {prescription.doctor?.email ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Patient</h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {prescription.patient?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {prescription.patient?.email ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Appointment</h3>
                <p>
                  <span className="font-medium">ID:</span>{" "}
                  {prescription.appointment?.id ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  <DateCell
                    date={prescription.appointment?.schedule?.startDateTime}
                    formatString="MMM dd, yyyy hh:mm a"
                  />
                </p>
                <p>
                  <span className="font-medium">End:</span>{" "}
                  <DateCell
                    date={prescription.appointment?.schedule?.endDateTime}
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

export default ViewPrescriptionDialog;
