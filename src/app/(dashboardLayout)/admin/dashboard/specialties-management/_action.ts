"use server";

import {
  createSpeciality,
  deleteSpeciality,
  getSpecialities,
  updateSpeciality,
} from "@/services/speciality.service";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { type ISpecialty } from "@/types/speciality.types";

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

export const getSpecialitiesAction = async (
  queryString?: string,
): Promise<ApiResponse<ISpecialty[]> | ApiErrorResponse> => {
  try {
    return await getSpecialities(queryString);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch specialties"),
    };
  }
};

export const createSpecialityAction = async (
  payload: { title: string; icon?: string },
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  try {
    return await createSpeciality(payload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create specialty"),
    };
  }
};

export const updateSpecialityAction = async (
  id: string,
  payload: { title: string; icon?: string },
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  if (!id) {
    return { success: false, message: "Invalid specialty id" };
  }

  try {
    return await updateSpeciality(id, payload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update specialty"),
    };
  }
};

export const deleteSpecialityAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return { success: false, message: "Invalid specialty id" };
  }

  try {
    return await deleteSpeciality(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete specialty"),
    };
  }
};
