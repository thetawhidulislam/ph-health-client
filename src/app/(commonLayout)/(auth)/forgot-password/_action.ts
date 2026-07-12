"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { forgotPasswordZodSchema, IForgotPasswordPayload } from "@/zod/auth.validation";

export const ForgotPasswordAction = async (
  payload: IForgotPasswordPayload,
): Promise<void | ApiErrorResponse> => {
  const parsedPayload = forgotPasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    await httpClient.post<unknown>(
      "/auth/forgot-password",
      parsedPayload.data,
    );
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unable to send reset email",
    };
  }
};
