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
import { ApiErrorResponse } from "@/types/api.types";
import { IForgotPasswordPayload, forgotPasswordZodSchema } from "@/zod/auth.validation";
import { ForgotPasswordAction } from "@/app/(commonLayout)/(auth)/forgot-password/_action";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation<
    void | ApiErrorResponse,
    Error,
    IForgotPasswordPayload
  >({
    mutationFn: (payload: IForgotPasswordPayload) =>
      ForgotPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        const result = await mutateAsync(value);
        if (result && "success" in result && !result.success) {
          setServerError(result.message || "Unable to send reset email");
          return;
        }

        setSuccessMessage(
          "If this email is registered, a password reset link has been sent.",
        );
        setTimeout(() => {
          router.push("/login");
        }, 1800);
      } catch (error: any) {
        setServerError(error?.message || "Unable to send reset email");
      }
    },
  });

  return (
    <div className="relative mx-auto w-full max-w-md py-8">
      <Card className="overflow-hidden rounded-[28px] border border-teal-900/10 bg-white/90 shadow-[0_20px_60px_-15px_rgba(11,79,74,0.25)] backdrop-blur-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-700 via-teal-500 to-amber-400" />
        <CardHeader className="pb-2 pt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700/80">
            PH Healthcare
          </p>
          <CardTitle className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900">
            Reset your password
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500">
            Enter your email and we’ll send a password reset link.
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
            className="space-y-5"
          >
            <form.Field
              name="email"
              validators={{ onChange: forgotPasswordZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="Enter your registered email"
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
                  pendingLabel="Sending..."
                  disabled={!canSubmit}
                  className="h-11 w-full rounded-full bg-[#353D4A] text-base font-medium tracking-wide shadow-lg shadow-teal-700/20 transition hover:bg-[#313946]"
                >
                  Send reset email
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>

        <CardFooter className="justify-between border-t border-slate-100 pt-4">
          <Link
            href="/login"
            className="text-sm font-medium text-teal-700 hover:underline underline-offset-4"
          >
            Back to login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-slate-700 hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
