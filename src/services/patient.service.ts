"use server";

import { UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
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

// ⚠️ Backend has no dedicated ban/unban route for patients.
// It only exposes a generic status-change endpoint:
//   PATCH /admin/change-user-status   body: { userId, userStatus }
// So "ban" = set status to a blocked/inactive value, "unban" = set back to ACTIVE.
//
// NOTE: `userId` here must be the *User* table's id (the patient's account/user id),
// NOT the patient's own record id — same id/userId split we already found on
// Doctor and Admin. Make sure the caller passes `patient.userId`, not `patient.id`.
//
// NOTE 2: Confirm the exact UserStatus enum value used for "banned" in your
// generated Prisma enums (e.g. it might be `BLOCKED`, `INACTIVE`, or `SUSPENDED`
// instead of the `"BLOCKED"` used below) and adjust if needed.

export const banPatient = async (
  userId: string,
): Promise<ApiResponse<{ message: string }>> => {
  return await httpClient.patch<{ message: string }>(
    "/admin/change-user-status",
    {
      userId,
      userStatus: "BLOCKED", // ⚠️ verify this matches your UserStatus enum
    },
  );
};

export const unbanPatient = async (
  userId: string,
): Promise<ApiResponse<{ message: string }>> => {
  return await httpClient.patch<{ message: string }>(
    "/admin/change-user-status",
    {
      userId,
      userStatus: "ACTIVE",
    },
  );
};
