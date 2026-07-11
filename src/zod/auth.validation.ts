import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
});

export const changePasswordZodSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

export const updateProfileFormZodSchema = z.object({
  name: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters").optional())
    .optional(),
  email: z
    .preprocess(emptyStringToUndefined, z.string().trim().email("Invalid email address").optional())
    .optional(),
  contactNumber: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 14 characters").optional())
    .optional(),
  address: z
    .preprocess(emptyStringToUndefined, z.string().trim().max(100, "Address must be at most 100 characters").optional())
    .optional(),
  registrationNumber: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(1, "Registration number is required").optional())
    .optional(),
  gender: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(1, "Gender must be provided").optional())
    .optional(),
  appointmentFee: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(1, "Appointment fee is required").optional())
    .optional(),
  qualification: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(2, "Qualification must be at least 2 characters").max(50, "Qualification must be at most 50 characters").optional())
    .optional(),
  currentWorkingPlace: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(2, "Current working place must be at least 2 characters").max(50, "Current working place must be at most 50 characters").optional())
    .optional(),
  designation: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(2, "Designation must be at least 2 characters").max(50, "Designation must be at most 50 characters").optional())
    .optional(),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;

export type IUpdateProfilePayload = z.infer<typeof updateProfileFormZodSchema>;
