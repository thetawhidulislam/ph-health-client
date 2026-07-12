"use client";

import {
  changeUserRoleAction,
  changeUserStatusAction,
} from "@/app/(dashboardLayout)/admin/dashboard/admins-management/_action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type IAdmin } from "@/types/admin.types";
import { UserStatus } from "@/types/doctor.types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: IAdmin | null;
  onSuccess: () => void;
}

const ChangeAdminDialog = ({
  open,
  onOpenChange,
  admin,
  onSuccess,
}: ChangeAdminDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(
    UserStatus.ACTIVE,
  );
  const [selectedRole, setSelectedRole] = useState<string>("ADMIN");
  const [syncedAdminId, setSyncedAdminId] = useState<string | null>(null);

  const statusMutation = useMutation({ mutationFn: changeUserStatusAction });
  const roleMutation = useMutation({ mutationFn: changeUserRoleAction });

  // Derive state during render instead of useEffect, per React's
  // "you might not need an effect" guidance — avoids the extra
  // render pass that setState-in-effect causes.
  const currentAdminId = open ? (admin?.user?.id ?? null) : null;

  if (currentAdminId && currentAdminId !== syncedAdminId) {
    setSyncedAdminId(currentAdminId);
    setSelectedStatus(admin?.user?.status ?? UserStatus.ACTIVE);
    setSelectedRole(admin?.user?.role ?? "ADMIN");
  }

  if (!open && syncedAdminId !== null) {
    setSyncedAdminId(null);
  }

  const handleSubmit = async () => {
    if (!admin || !admin.user?.id) {
      toast.error("Admin data is not available.");
      return;
    }

    const userId = String(admin.user.id);
    const roleChanged = selectedRole !== admin.user.role;
    const statusChanged = selectedStatus !== admin.user.status;

    if (!roleChanged && !statusChanged) {
      toast.error("No changes were made.");
      return;
    }

    try {
      if (roleChanged) {
        const roleResult = await roleMutation.mutateAsync({
          userId,
          role: selectedRole,
        });
        if (!roleResult.success) {
          toast.error(roleResult.message || "Failed to update role");
          return;
        }
        toast.success(roleResult.message || "Role updated successfully");
      }

      if (statusChanged) {
        const statusResult = await statusMutation.mutateAsync({
          userId,
          userStatus: selectedStatus,
        });
        if (!statusResult.success) {
          toast.error(statusResult.message || "Failed to update status");
          return;
        }
        toast.success(statusResult.message || "Status updated successfully");
      }

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update admin details.");
    }
  };

  const isPending = statusMutation.isPending || roleMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Manage Admin</DialogTitle>
          <DialogDescription>
            Update status or role for this admin account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value ?? "ADMIN")}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(
                  value ? (value as UserStatus) : UserStatus.ACTIVE,
                )
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserStatus.ACTIVE}>ACTIVE</SelectItem>
                <SelectItem value={UserStatus.BLOCKED}>BLOCKED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAdminDialog;
