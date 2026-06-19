"use server";

import { AxiosError } from "axios";
import { httpClient } from "@/lib/axios/httpClient";
import { ISpeciality } from "@/types/speciality.types";

const specialityEndpoints = [
  "/specialties",
  "/specialities",
  "/speciality",
  "/specialty",
];

async function fetchSpecialities(path: string) {
  return await httpClient.get<ISpeciality[]>(path);
}

export async function getSpecialities() {
  let lastError: unknown;

  for (const path of specialityEndpoints) {
    try {
      return await fetchSpecialities(path);
    } catch (error) {
      lastError = error;
      if (!(error instanceof AxiosError) || error.response?.status !== 404) {
        console.error(`Error fetching specialities from ${path}:`, error);
        throw error;
      }
    }
  }

  console.error("All speciality endpoints returned 404:", lastError);
  throw lastError;
}
