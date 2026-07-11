import { z } from "zod";
import { UserStatus } from "@/types/doctor.types";

export const updateAdminServerZodSchema = z.object({
  admin: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters")
        .optional(),
      profilePhoto: z
        .string()
        .trim()
        .url("Profile photo must be a valid URL")
        .optional(),
      contactNumber: z
        .string()
        .trim()
        .min(11, "Contact number must be at least 11 characters")
        .max(14, "Contact number must be at most 14 characters")
        .optional(),
      address: z
        .string()
        .trim()
        .max(100, "Address must be at most 100 characters")
        .optional(),
      email: z.string().trim().email("Email must be valid").optional(),
    })
    .optional(),
});

export const changeUserStatusServerZodSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  userStatus: z.nativeEnum(UserStatus),
});

export const changeUserRoleServerZodSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  role: z.string().min(1, "Role is required"),
});
