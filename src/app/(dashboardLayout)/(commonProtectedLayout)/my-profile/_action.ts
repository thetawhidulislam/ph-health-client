"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { type IUpdateDoctorPayload, Gender } from "@/types/doctor.types";
import { type UserInfo } from "@/types/user.types";

export type ProfileFormValues = {
  name?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber?: string;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  gender?: string;
};

export type UpdateProfileAction = (params: {
  user: UserInfo;
  values: ProfileFormValues;
}) => Promise<ApiResponse<unknown> | ApiErrorResponse>;

export const updateMyProfileAction: UpdateProfileAction = async ({
  user,
  values,
}: {
  user: UserInfo;
  values: ProfileFormValues;
}): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
  try {
    const role = user.role?.toUpperCase();
    console.log(user.id);
    if (role === "PATIENT") {
      const payload = {
        patientInfo: {
          ...(values.name ? { name: values.name } : {}),
          ...(values.contactNumber
            ? { contactNumber: values.contactNumber }
            : {}),
          ...(values.address ? { address: values.address } : {}),
        },
      };

      return await httpClient.patch<unknown>(
        "/patients/update-my-profile",
        payload,
      );
    }

    if (role === "DOCTOR") {
      const payload: IUpdateDoctorPayload = {
        doctor: {
          ...(values.name ? { name: values.name } : {}),
          ...(values.contactNumber
            ? { contactNumber: values.contactNumber }
            : {}),
          ...(values.address ? { address: values.address } : {}),
          ...(values.registrationNumber
            ? { registrationNumber: values.registrationNumber }
            : {}),
          ...(values.gender
            ? { gender: values.gender === "MALE" ? Gender.MALE : Gender.FEMALE }
            : {}),
          ...(typeof values.appointmentFee === "number"
            ? { appointmentFee: values.appointmentFee }
            : {}),
          ...(values.qualification
            ? { qualification: values.qualification }
            : {}),
          ...(values.currentWorkingPlace
            ? { currentWorkingPlace: values.currentWorkingPlace }
            : {}),
          ...(values.designation ? { designation: values.designation } : {}),
        },
      };

      return await httpClient.patch<unknown>(`/doctors/${user.id}`, payload);
    }

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      const payload = {
        admin: {
          ...(values.name ? { name: values.name } : {}),
          ...(values.email ? { email: values.email } : {}),
          ...(values.contactNumber
            ? { contactNumber: values.contactNumber }
            : {}),
          ...(values.address ? { address: values.address } : {}),
        },
      };

      return await httpClient.patch<unknown>(`/admin/${user.id}`, payload);
    }

    return {
      success: false,
      message: "Unsupported role for profile update.",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Failed to update profile.",
    };
  }
};
