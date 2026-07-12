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
import { IRegisterFormPayload, registerZodSchema } from "@/zod/auth.validation";
import { RegisterAction } from "@/app/(commonLayout)/(auth)/register/_action";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  redirectPath?: string;
}

const RegisterForm = ({ redirectPath }: RegisterFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation<
    void | ApiErrorResponse,
    Error,
    IRegisterFormPayload
  >({
    mutationFn: (payload: IRegisterFormPayload) =>
      RegisterAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if (result && "success" in result && !result.success) {
          setServerError(result.message || "registration failed");
        }
      } catch (error: any) {
        setServerError(error.message || "registration failed");
      }
    },
  });

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />

      <Card className="relative overflow-hidden rounded-[28px] border border-teal-900/10 bg-white/90 shadow-[0_20px_60px_-15px_rgba(11,79,74,0.25)] backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-500 dark:border-teal-100/10 dark:bg-slate-900/90 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-teal-400 dark:from-amber-400 dark:via-amber-300 dark:to-teal-300" />

        <CardHeader className="pb-2 pt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700/80 dark:text-amber-400/90">
            PH Healthcare
          </p>
          <CardTitle className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Create your patient account
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Register to manage appointments, prescriptions, and your profile.
          </CardDescription>
          <svg
            viewBox="0 0 400 32"
            className="mx-auto mt-5 h-6 w-full max-w-[220px] text-amber-600/70 dark:text-amber-400/70"
            fill="none"
          >
            <path
              d="M0 16 H140 L155 4 L170 28 L185 16 H260 L275 4 L290 28 L305 16 H400"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </CardHeader>

        <CardContent className="pt-2">
          <form
            method="POST"
            action="#"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="name"
              validators={{ onChange: registerZodSchema.shape.name }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                />
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ onChange: registerZodSchema.shape.email }}
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
              name="password"
              validators={{ onChange: registerZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  append={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{ onChange: registerZodSchema.shape.confirmPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Registering..."
                  disabled={!canSubmit}
                  className="h-11 w-full rounded-full bg-[#353D4A] text-base font-medium tracking-wide text-white shadow-lg shadow-amber-700/20 transition hover:bg-[#313946] dark:shadow-amber-500/10"
                >
                  Create Account
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 uppercase tracking-wide text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                Already have an account?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="h-11 w-full rounded-full border-slate-200 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
              window.location.href = `${baseUrl}/auth/login/google`;
            }}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-amber-700 hover:underline underline-offset-4 dark:text-amber-400"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
