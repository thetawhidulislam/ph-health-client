"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPrescription } from "@/types/prescription.types";

const buildPrescriptionUrl = (basePath: string, queryString?: string) =>
  `${basePath}${queryString ? `?${queryString}` : ""}`;

const PRESCRIPTION_ENDPOINTS = [
  "/prescription",
  "/prescription",
  "/api/prescription",
  "/api/prescription",
];

const BASE = "/prescription"; 

export const getPrescriptions = async (queryString?: string) => {
  let lastError: unknown;

  for (const basePath of PRESCRIPTION_ENDPOINTS) {
    try {
      const url = buildPrescriptionUrl(basePath, queryString);
      return await httpClient.get<IPrescription[]>(url);
    } catch (error: unknown) {
      lastError = error;
      const errorResponse =
        error && typeof error === "object" && "response" in error
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? (error as any).response
          : null;

      if (errorResponse?.status === 404) {
        continue;
      }

      console.log("Error fetching prescriptions:", error);
      throw error;
    }
  }

  console.error(
    "No valid prescription endpoint found. Tried:",
    PRESCRIPTION_ENDPOINTS,
    "Last error:",
    lastError,
  );
  throw new Error("Prescription endpoint not found. Check your backend route.");
};
export const givePrescription = async (payload: {
  appointmentId: string;
  instructions: string;
  followUpDate: string;
}) => {
  try {
    return await httpClient.post<IPrescription>(BASE, payload);
  } catch (error) {
    console.log("Error giving prescription:", error);
    throw error;
  }
};

export const getMyPrescriptions = async () => {
  try {
    return await httpClient.get<IPrescription[]>(`${BASE}/my-prescriptions`);
  } catch (error) {
    console.log("Error fetching my prescriptions:", error);
    throw error;
  }
};

export const getAllPrescriptions = async (queryString?: string) => {
  try {
    const url = `${BASE}${queryString ? `?${queryString}` : ""}`;
    return await httpClient.get<IPrescription[]>(url);
  } catch (error) {
    console.log("Error fetching all prescriptions:", error);
    throw error;
  }
};

export const updatePrescription = async (
  id: string,
  payload: { instructions?: string; followUpDate?: string },
) => {
  try {
    return await httpClient.patch<IPrescription>(`${BASE}/${id}`, payload);
  } catch (error) {
    console.log("Error updating prescription:", error);
    throw error;
  }
};

export const deletePrescription = async (id: string) => {
  try {
    return await httpClient.delete<{ message: string }>(`${BASE}/${id}`);
  } catch (error) {
    console.log("Error deleting prescription:", error);
    throw error;
  }
};