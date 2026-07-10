"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPrescription } from "@/types/prescription.types";

const buildPrescriptionUrl = (basePath: string, queryString?: string) =>
  `${basePath}${queryString ? `?${queryString}` : ""}`;

const PRESCRIPTION_ENDPOINTS = [
  "/prescriptions",
  "/prescription",
  "/api/prescriptions",
  "/api/prescription",
];

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
