"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IAdmin,
  IAdminDetails,
  IChangeUserRolePayload,
  IChangeUserStatusPayload,
  IUpdateAdminPayload,
} from "@/types/admin.types";
import { IPatientDetails } from "@/types/patient.types";

export const getAdmins = async (queryString?: string) => {
  const endpoint = queryString ? `/admin?${queryString}` : "/admin";
  const response = await httpClient.get<IAdmin[]>(endpoint);
  return response;
};

export const getAdminById = async (id: string) => {
  const response = await httpClient.get<IAdminDetails>(`/admin/${id}`);
  return response;
};

export const updateAdmin = async (id: string, payload: IUpdateAdminPayload) => {
  const response = await httpClient.patch<IAdmin>(`/admin/${id}`, payload);
  return response;
};

export const deleteAdmin = async (id: string) => {
  const response = await httpClient.delete<{ message: string }>(`/admin/${id}`);
  return response;
};

export const deletePatientById = async (id: string) => {
  try {
    const res = await httpClient.delete<IPatientDetails>(`/patients/${id}`);
    return res;
  } catch (error) {
    console.log("Error fetching patient:", error);
    throw error;
  }
};

export const changeUserStatus = async (payload: IChangeUserStatusPayload) => {
  const response = await httpClient.patch<{ message: string }>(
    "/admin/change-user-status",
    payload,
  );
  return response;
};

export const changeUserRole = async (payload: IChangeUserRolePayload) => {
  const response = await httpClient.patch<{ message: string }>(
    "/admin/change-user-role",
    payload,
  );
  return response;
};
