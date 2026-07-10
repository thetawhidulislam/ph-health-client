"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAppointment } from "@/types/appointment.types";

export const getPayments = async (queryString?: string) => {
  try {
    const url = `/appointments/all-appointments${queryString ? `?${queryString}` : ""}`;
    return await httpClient.get<IAppointment[]>(url);
  } catch (error) {
    console.log("Error fetching payments:", error);
    throw error;
  }
};
