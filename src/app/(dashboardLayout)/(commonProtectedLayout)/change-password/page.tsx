"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangePasswordAction } from "./_action";
import { changePasswordZodSchema, IChangePasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChangePassword = () => {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IChangePasswordPayload) =>
      ChangePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);
      const result = await mutateAsync(value);

      if (!result.success) {
        setServerError(result.message || "Failed to change password");
        return;
      }

      setSuccessMessage("Password changed successfully.");
      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 1200);
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-10 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Enter your email, OTP, and new password to update your account.
          </CardDescription>
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
            <form.Field
              name="currentPassword"
              validators={{ onChange: changePasswordZodSchema.shape.currentPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{ onChange: changePasswordZodSchema.shape.newPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{ onChange: changePasswordZodSchema.shape.confirmPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                />
              )}
            </form.Field>

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

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                  pendingLabel="Updating password..."
                >
                  Update Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="ghost" onClick={() => router.push("/")}> 
            Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePassword;
