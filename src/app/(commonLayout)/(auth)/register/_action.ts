/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse } from "@/types/auth.types";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { z } from "zod";

const registerPayloadSchema = z.object({
  name: registerZodSchema.shape.name,
  email: registerZodSchema.shape.email,
  password: registerZodSchema.shape.password,
});

export const RegisterAction = async (
  payload: IRegisterPayload,
  redirectPath: string | undefined,
): Promise<void | ApiErrorResponse> => {
  const parsedPayload = registerPayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<IRegisterResponse>(
      "/auth/register",
      parsedPayload.data,
    );

    const { accessToken, refreshToken, token } = response.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

    redirect(redirectPath || "/dashboard");
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
      message: `Register failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
