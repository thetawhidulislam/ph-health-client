"use server";

import { getPatients, getPatientById, banPatient, unbanPatient } from "@/services/patient.service";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { type IPatient, type IPatientDetails } from "@/types/patient.types";

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

export const getPatientsAction = async (queryString?: string) : Promise<ApiResponse<IPatient[]> | ApiErrorResponse> => {
  try {
    return await getPatients(queryString);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to fetch patients") };
  }
};

export const getPatientByIdAction = async (id: string) : Promise<ApiResponse<IPatientDetails> | ApiErrorResponse> => {
  if (!id) return { success: false, message: "Invalid patient id" };

  try {
    return await getPatientById(id);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to fetch patient details") };
  }
};

export const banPatientAction = async (id: string) : Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) return { success: false, message: "Invalid patient id" };

  try {
    return await banPatient(id);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to ban patient") };
  }
};

export const unbanPatientAction = async (id: string) : Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) return { success: false, message: "Invalid patient id" };

  try {
    return await unbanPatient(id);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to unban patient") };
  }
};
