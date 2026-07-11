"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { changePasswordZodSchema, IChangePasswordPayload } from "@/zod/auth.validation";

export const ChangePasswordAction = async (
  payload: IChangePasswordPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
  const parsedPayload = changePasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message,
    };
  }

  const { currentPassword, newPassword } = parsedPayload.data;

  try {
    const response = await httpClient.post<unknown>("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response;
  } catch (error: unknown) {
    const errorMessage =
      error && typeof error === "object" && "response" in error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? (error as any).response?.data?.message
        : null;
    return {
      success: false,
      message:
        errorMessage ||
        (error instanceof Error ? error.message : "Failed to change password"),
    };
  }
};
