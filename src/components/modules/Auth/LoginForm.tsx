"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginAction } from "@/app/(commonLayout)/(auth)/login/_action";
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
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  redirectPath?: string;
}

const demoAccounts = [
  {
    role: "Admin",
    email: "admin@gmail.com",
    password: "12345678",
    icon: ShieldCheck,
    accent: "text-slate-600 dark:text-slate-300",
    ring: "hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-600 dark:hover:bg-slate-800/60",
  },
  {
    role: "Doctor",
    email: "dr.mahmudhasan@gmail.com",
    password: "Doctor@789",
    icon: Stethoscope,
    accent: "text-teal-700 dark:text-teal-400",
    ring: "hover:border-teal-300 hover:bg-teal-50 dark:hover:border-teal-700 dark:hover:bg-teal-900/30",
  },
  {
    role: "Patient",
    email: "tawhidulislam200688@gmail.com",
    password: "123456789",
    icon: UserRound,
    accent: "text-amber-600 dark:text-amber-400",
    ring: "hover:border-amber-300 hover:bg-amber-50 dark:hover:border-amber-700 dark:hover:bg-amber-900/20",
  },
];

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => LoginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        if (!result.success) {
          setServerError(result.message || "login failed");
          return;
        }
      } catch (error: any) {
        console.log(`Login Failed: ${error.message}`);
        setServerError(error.message || "login failed");
      }
    },
  });

  const fillDemoCredentials = (
    email: string,
    password: string,
    role: string,
  ) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    toast.success(`${role} credentials loaded`);
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Ambient care-glow, purely decorative */}
      <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10" />

      <Card className="relative overflow-hidden rounded-[28px] border border-teal-900/10 bg-white/90 shadow-[0_20px_60px_-15px_rgba(11,79,74,0.25)] backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-500 dark:border-teal-100/10 dark:bg-slate-900/90 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-700 via-teal-500 to-amber-400 dark:from-teal-600 dark:via-teal-400 dark:to-amber-300" />

        <CardHeader className="pb-2 pt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700/80 dark:text-teal-400/90">
            PH Healthcare
          </p>
          <CardTitle className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome back to your care record
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign in to pick up right where your care team left off.
          </CardDescription>

          {/* Signature pulse-line divider */}
          <svg
            viewBox="0 0 400 32"
            className="mx-auto mt-5 h-6 w-full max-w-[220px] text-teal-600/70 dark:text-teal-400/70"
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
            {/* Quick demo access */}
            <div className="rounded-2xl border border-teal-900/10 bg-teal-50/50 p-3 dark:border-teal-100/10 dark:bg-teal-950/30">
              <p className="mb-2.5 px-1 text-[11px] font-medium uppercase tracking-wide text-teal-700/70 dark:text-teal-400/80">
                Quick demo access
              </p>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={account.role}
                      type="button"
                      onClick={() =>
                        fillDemoCredentials(
                          account.email,
                          account.password,
                          account.role,
                        )
                      }
                      className={`flex flex-col items-center gap-1.5 rounded-xl border border-transparent bg-white px-2 py-3 text-center shadow-sm transition dark:bg-slate-800 dark:shadow-none ${account.ring}`}
                    >
                      <Icon className={`size-5 ${account.accent}`} />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {account.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form.Field
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
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
              validators={{ onChange: loginZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="cursor-pointer"
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

            <div className="-mt-1 text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-teal-700 hover:underline underline-offset-4 dark:text-teal-400"
              >
                Forgot password?
              </Link>
            </div>

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
                  pendingLabel="Logging In...."
                  disabled={!canSubmit}
                  className="h-11 w-full rounded-full bg-[#353D4A] text-base font-medium tracking-wide text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#313946] dark:shadow-teal-500/10"
                >
                  Log In
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
                Or continue with
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
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-teal-700 hover:underline underline-offset-4 dark:text-teal-400"
            >
              Sign Up for an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;