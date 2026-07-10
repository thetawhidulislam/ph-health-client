"use client";

import {
  createSpecialityAction,
  updateSpecialityAction,
} from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISpecialty } from "@/types/speciality.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SpecialtyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialty?: ISpecialty | null;
  mode: "create" | "edit";
}

const SpecialtyFormDialog = ({
  open,
  onOpenChange,
  specialty,
  mode,
}: SpecialtyFormDialogProps) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: createSpecialityAction,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { title: string; icon?: string };
    }) => updateSpecialityAction(id, payload),
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    setTitle(specialty?.title ?? "");
    setIcon(specialty?.icon ?? "");
  }, [open, specialty]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error("Specialty title is required");
      return;
    }

    const payload = {
      title: trimmedTitle,
      icon: icon.trim() || undefined,
    };

    const result =
      mode === "create"
        ? await createMutation.mutateAsync(payload)
        : specialty
          ? await updateMutation.mutateAsync({
              id: specialty.id,
              payload,
            })
          : { success: false, message: "Specialty not found" };

    if (!result.success) {
      toast.error(result.message || "Unable to save specialty");
      return;
    }

    toast.success(
      mode === "create"
        ? "Specialty created successfully"
        : "Specialty updated successfully",
    );

    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["specialties"] });
    void queryClient.refetchQueries({ queryKey: ["specialties"], type: "active" });
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Specialty" : "Edit Specialty"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new specialty to the catalog."
              : "Update the specialty details below."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="specialty-title">Title</Label>
            <Input
              id="specialty-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Cardiology"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty-icon">Icon</Label>
            <Input
              id="specialty-icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              placeholder="Optional icon name"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create Specialty"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialtyFormDialog;
