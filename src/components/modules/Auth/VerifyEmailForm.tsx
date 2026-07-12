/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IVerifyEmailPayload, verifyEmailZodSchema } from "@/zod/auth.validation";
import { VerifyEmailAction } from "@/app/(commonLayout)/(auth)/verify-email/_action";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation<
    void | ApiErrorResponse,
    Error,
    IVerifyEmailPayload
  >({
    mutationFn: (payload: IVerifyEmailPayload) =>
      VerifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);

      try {
        const result = await mutateAsync(value);
        if (result && "success" in result && !result.success) {
          setServerError(result.message || "Unable to verify email");
          return;
        }

        setSuccessMessage("Email verified successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 1800);
      } catch (error: any) {
        setServerError(error?.message || "Unable to verify email");
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
            Verify your email
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500">
            Enter the code we sent to confirm your email address.
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
              validators={{ onChange: verifyEmailZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />
              )}
            </form.Field>

            <form.Field
              name="otp"
              validators={{ onChange: verifyEmailZodSchema.shape.otp }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Verification Code"
                  type="text"
                  placeholder="Enter verification code"
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
                  pendingLabel="Verifying..."
                  disabled={!canSubmit}
                  className="h-11 w-full rounded-full bg-[#353D4A] text-base font-medium tracking-wide shadow-lg shadow-teal-700/20 transition hover:bg-[#313946]"
                >
                  Verify Email
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>

        <CardFooter className="justify-between border-t border-slate-100 pt-4">
          <Button variant="ghost" onClick={() => router.push("/login")}>Back to login</Button>
          <Link
            href="/register"
            className="text-sm font-medium text-teal-700 hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailForm;
