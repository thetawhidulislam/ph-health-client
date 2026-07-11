"use server";

import {
  getAdmins,
  getAdminById,
  deleteAdmin,
  changeUserRole,
  changeUserStatus,
} from "@/services/admin.service";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import {
  IAdmin,
  IAdminDetails,
  IChangeUserRolePayload,
  IChangeUserStatusPayload,
} from "@/types/admin.types";
import { changeUserRoleServerZodSchema, changeUserStatusServerZodSchema } from "@/zod/admin.validation";

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export const getAdminsAction = async (
  queryString?: string,
): Promise<ApiResponse<IAdmin[]> | ApiErrorResponse> => {
  try {
    return await getAdmins(queryString);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch admins"),
    };
  }
};

export const getAdminByIdAction = async (
  id: string,
): Promise<ApiResponse<IAdminDetails> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  try {
    return await getAdminById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch admin details"),
    };
  }
};

export const deleteAdminAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  try {
    return await deleteAdmin(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete admin"),
    };
  }
};

export const changeUserStatusAction = async (
  payload: IChangeUserStatusPayload,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  const parsed = changeUserStatusServerZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await changeUserStatus(parsed.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change user status"),
    };
  }
};

export const changeUserRoleAction = async (
  payload: IChangeUserRolePayload,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  const parsed = changeUserRoleServerZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await changeUserRole(parsed.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change user role"),
    };
  }
};
