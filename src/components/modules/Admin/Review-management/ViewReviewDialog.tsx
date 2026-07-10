"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.types";

interface ViewReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: IReview | null;
}

const ViewReviewDialog = ({
  open,
  onOpenChange,
  review,
}: ViewReviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,78rem)]">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>View review details, rating, appointment, and reviewer information.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-4">
          {!review ? (
            <div className="text-muted-foreground">No review selected.</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Review</h3>
                <p>
                  <span className="font-medium">ID:</span> {review.id}
                </p>
                <p>
                  <span className="font-medium">Rating:</span> {review.rating ?? "N/A"} / 5
                </p>
                <p>
                  <span className="font-medium">Comment:</span> {review.comment || "No comment provided"}
                </p>
                <p>
                  <span className="font-medium">Created:</span> <DateCell date={review.createdAt} formatString="MMM dd, yyyy hh:mm a" />
                </p>
                <p>
                  <span className="font-medium">Updated:</span> <DateCell date={review.updatedAt} formatString="MMM dd, yyyy hh:mm a" />
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Patient</h3>
                <p>
                  <span className="font-medium">Name:</span> {review.patient?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {review.patient?.email ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Doctor</h3>
                <p>
                  <span className="font-medium">Name:</span> {review.doctor?.name ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {review.doctor?.email ?? "N/A"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-sm font-semibold">Appointment</h3>
                <p>
                  <span className="font-medium">ID:</span> {review.appointment?.id ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium">Start:</span> <DateCell date={review.appointment?.schedule?.startDateTime} formatString="MMM dd, yyyy hh:mm a" />
                </p>
                <p>
                  <span className="font-medium">End:</span> <DateCell date={review.appointment?.schedule?.endDateTime} formatString="MMM dd, yyyy hh:mm a" />
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
