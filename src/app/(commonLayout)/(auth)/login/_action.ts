"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const LoginAction = async (
  payload: ILoginPayload,
  redirectPath: string | undefined,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }
  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );
    const { accessToken, refreshToken, token, user } = response.data;

    const { needPasswordChange, email, emailVerified, role } = user;
    if (!user) {
      return {
        success: false,
        message: "User data not found",
      };
    }
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    // if (!emailVerified) {
    //   redirect("/verify-email");
    // } else
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    } else {
      const targetedPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
      redirect(targetedPath);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return {
      success: false,
      message: `login failed : ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
