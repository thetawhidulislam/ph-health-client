"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IVerifyEmailPayload, verifyEmailZodSchema } from "@/zod/auth.validation";

export const VerifyEmailAction = async (
  payload: IVerifyEmailPayload,
): Promise<void | ApiErrorResponse> => {
  const parsedPayload = verifyEmailZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    await httpClient.post<unknown>(
      "/auth/verify-email",
      parsedPayload.data,
    );
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unable to verify email",
    };
  }
};
