"use server";

import { AxiosError } from "axios";
import { httpClient } from "@/lib/axios/httpClient";
import { ISpecialty } from "@/types/speciality.types";

const specialityEndpoints = [
  "/specialties",
  "/specialities",
  "/speciality",
  "/specialty",
];

async function fetchSpecialities(path: string) {
  return await httpClient.get<ISpecialty[]>(path);
}

export async function getSpecialities(queryString?: string) {
  let lastError: unknown;

  for (const path of specialityEndpoints) {
    try {
      return await httpClient.get<ISpecialty[]>(
        queryString ? `${path}?${queryString}` : path,
      );
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

export async function createSpeciality(payload: { title: string; icon?: string }) {
  return await httpClient.post<ISpecialty>("/specialties", payload);
}

export async function updateSpeciality(
  id: string,
  payload: { title: string; icon?: string },
) {
  return await httpClient.patch<ISpecialty>(`/specialties/${id}`, payload);
}

export async function deleteSpeciality(id: string) {
  return await httpClient.delete<{ message: string }>(`/specialties/${id}`);
}
