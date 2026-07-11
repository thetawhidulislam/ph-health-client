/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { UserInfo } from "@/types/user.types";
import type { ProfileFormValues, UpdateProfileAction } from "./_action";
import { updateProfileFormZodSchema } from "@/zod/auth.validation";

interface MyProfileFormProps {
  currentUser: UserInfo;
  initialValues: ProfileFormValues;
  updateAction: UpdateProfileAction;
}

const MyProfileForm = ({ currentUser, initialValues, updateAction }: MyProfileFormProps) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const role = currentUser.role?.toUpperCase();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: ProfileFormValues) => updateAction({ user: currentUser, values }),
  });

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);

      const result = await mutateAsync(value);

      if (!result.success) {
        setServerError(result.message || "Failed to update profile");
        toast.error(result.message || "Failed to update profile");
        return;
      }

      setSuccessMessage(result.message || "Profile updated successfully");
      toast.success(result.message || "Profile updated successfully");
      void router.refresh();
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Update Profile</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your profile information for your current dashboard role.
        </p>
      </CardHeader>
      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <form.Field name="name" validators={{ onChange: updateProfileFormZodSchema.shape.name  as any}}>
              {(field) => <AppField field={field} label="Name" placeholder="Enter your full name" />}
            </form.Field>

            <form.Field name="email" validators={{ onChange: updateProfileFormZodSchema.shape.email as any }}>
              {(field) => <AppField field={field} type="email" label="Email" placeholder="Enter your email" />}
            </form.Field>

            <form.Field
              name="contactNumber"
              validators={{ onChange: updateProfileFormZodSchema.shape.contactNumber as any }}
            >
              {(field) => <AppField field={field} label="Contact Number" placeholder="Enter your contact number" />}
            </form.Field>

            <form.Field name="address" validators={{ onChange: updateProfileFormZodSchema.shape.address as any }}>
              {(field) => <AppField field={field} label="Address" placeholder="Enter your address" />}
            </form.Field>

            {role === "DOCTOR" && (
              <>
                <form.Field
                  name="registrationNumber"
                  validators={{ onChange: updateProfileFormZodSchema.shape.registrationNumber as any }}
                >
                  {(field) => (
                    <AppField field={field} label="Registration Number" placeholder="Enter registration number" />
                  )}
                </form.Field>

                <form.Field name="gender" validators={{ onChange: updateProfileFormZodSchema.shape.gender as any }}>
                  {(field) => (
                    <AppField field={field} label="Gender" placeholder="MALE or FEMALE" />
                  )}
                </form.Field>

                <form.Field
                  name="appointmentFee"
                  validators={{ onChange: updateProfileFormZodSchema.shape.appointmentFee as any }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      type="number"
                      label="Appointment Fee"
                      placeholder="Enter appointment fee"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="qualification"
                  validators={{ onChange: updateProfileFormZodSchema.shape.qualification  as any }}
                >
                  {(field) => <AppField field={field} label="Qualification" placeholder="Enter qualification" />}
                </form.Field>

                <form.Field
                  name="currentWorkingPlace"
                  validators={{ onChange: updateProfileFormZodSchema.shape.currentWorkingPlace as any }}
                >
                  {(field) => (
                    <AppField field={field} label="Current Working Place" placeholder="Enter current workplace" />
                  )}
                </form.Field>

                <form.Field
                  name="designation"
                  validators={{ onChange: updateProfileFormZodSchema.shape.designation as any  }}
                >
                  {(field) => <AppField field={field} label="Designation" placeholder="Enter designation" />}
                </form.Field>
              </>
            )}

            {(role === "ADMIN" || role === "SUPER_ADMIN") && (
              <div className="md:col-span-2">
                <Alert>
                  <AlertDescription>
                    Admin updates are restricted to profile information only. Use the fields above to update your display details.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <AppSubmitButton isPending={isPending} disabled={false}>
              Update Profile
            </AppSubmitButton>
            <Button variant="outline" onClick={() => void router.push("/")}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MyProfileForm;
