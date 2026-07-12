"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";

export const ResetPasswordAction = async (
  payload: IResetPasswordPayload,
): Promise<void | ApiErrorResponse> => {
  const parsedPayload = resetPasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    await httpClient.post<unknown>(
      "/auth/reset-password",
      {
        email: parsedPayload.data.email,
        otp: parsedPayload.data.otp,
        password: parsedPayload.data.newPassword,
      },
    );
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unable to reset password",
    };
  }
};
