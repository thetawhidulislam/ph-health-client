"use server";

import { getAllAppointments, changeAppointmentStatus } from "@/services/appointment.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { type IAppointment } from "@/types/appointment.types";

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

export const getAppointmentsAction = async (queryString?: string): Promise<ApiResponse<IAppointment[]> | ApiErrorResponse> => {
  try {
    return await getAllAppointments(queryString);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to fetch appointments") };
  }
};

export const changeAppointmentStatusAction = async (id: string, payload: { status: string }): Promise<ApiResponse<IAppointment> | ApiErrorResponse> => {
  if (!id) return { success: false, message: "Invalid appointment id" };

  try {
    return await changeAppointmentStatus(id, payload);
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to change appointment status") };
  }
};

export const getAppointmentByIdAction = async (id: string): Promise<ApiResponse<IAppointment> | ApiErrorResponse> => {
  if (!id) return { success: false, message: "Invalid appointment id" };

  try {
    const res = await getAllAppointments();
    const appointment = res.data?.find((a) => a.id === id);
    if (!appointment) return { success: false, message: "Appointment not found" };
    return { success: true, message: "OK", data: appointment };
  } catch (error: unknown) {
    return { success: false, message: getActionErrorMessage(error, "Failed to fetch appointment details") };
  }
};
