"use client";

import { getAdminByIdAction } from "@/app/(dashboardLayout)/admin/dashboard/admins-management/_action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type IAdmin } from "@/types/admin.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface ViewAdminProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: IAdmin | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.getTime())) return "N/A";
  return format(dateValue, "MMM dd, yyyy hh:mm a");
};

const ViewAdminProfileDialog = ({
  open,
  onOpenChange,
  admin,
}: ViewAdminProfileDialogProps) => {
  const adminId = admin ? String(admin.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-details", adminId],
    queryFn: () => getAdminByIdAction(adminId),
    enabled: open && adminId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const adminDetails = data && data.success ? data.data : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-full gap-0 overflow-hidden p-0 sm:max-h-screen sm:max-w-2xl md:max-w-3xl">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Admin Profile</DialogTitle>
          <DialogDescription>
            View admin account details and profile information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-4 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Loading admin details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load admin details."}
              </div>
            )}

            {!isLoading && !isFetching && adminDetails && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 text-sm font-semibold">Admin Info</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {adminDetails.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {adminDetails.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span> {adminDetails.contactNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span> {adminDetails.address || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 text-sm font-semibold">User Account</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Role:</span> {adminDetails.user?.role || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {adminDetails.user?.status || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span> {formatDateTime(adminDetails.user?.createdAt)}
                    </p>
                    <p>
                      <span className="font-medium">Updated:</span> {formatDateTime(adminDetails.user?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAdminProfileDialog;
