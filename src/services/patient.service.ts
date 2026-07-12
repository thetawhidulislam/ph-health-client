"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPatient, IPatientDetails } from "@/types/patient.types";

export const getPatients = async (queryString?: string) => {
  try {
    const endpoint = queryString ? `/patients?${queryString}` : "/patients";
    const res = await httpClient.get<IPatient[]>(endpoint);
    return res;
  } catch (error) {
    // If the API doesn't expose /patients, try falling back to /users?role=PATIENT
    // Some backends expose patients as users with patient role.
    // Only attempt fallback for 404 responses.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyErr = error as any;
    console.log("Error fetching patients (primary):", anyErr);

    if (anyErr?.response?.status === 404) {
      try {
        const fallbackEndpoint = queryString
          ? `/users?role=PATIENT&${queryString}`
          : "/users?role=PATIENT";
        console.log("Trying fallback endpoint:", fallbackEndpoint);
        const fallbackRes = await httpClient.get<IPatient[]>(fallbackEndpoint);
        return fallbackRes;
      } catch (fallbackError) {
        console.log("Fallback fetch patients failed:", fallbackError);
        throw fallbackError;
      }
    }

    throw error;
  }
};

export const getPatientById = async (id: string) => {
  try {
    const res = await httpClient.get<IPatientDetails>(`/patients/${id}`);
    return res;
  } catch (error) {
    console.log("Error fetching patient:", error);
    throw error;
  }
};

export const banPatient = async (id: string) => {
  try {
    const res = await httpClient.patch<{ message: string }>(
      `/patients/${id}/ban`,
      {},
    );
    return res;
  } catch (error) {
    console.log("Error banning patient:", error);
    throw error;
  }
};

export const unbanPatient = async (id: string) => {
  try {
    const res = await httpClient.patch<{ message: string }>(
      `/patients/${id}/unban`,
      {},
    );
    return res;
  } catch (error) {
    console.log("Error unbanning patient:", error);
    throw error;
  }
};
