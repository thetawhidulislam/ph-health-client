import { UserStatus } from "./doctor.types";

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  createdAt?: string | Date;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    status?: UserStatus;
    emailVerified?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
}

export interface IAdminDetails extends IAdmin {}

export interface IUpdateAdminPayload {
  admin?: {
    name?: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    email?: string;
  };
}

export interface IChangeUserStatusPayload {
  userId: string;
  userStatus: UserStatus;
}

export interface IChangeUserRolePayload {
  userId: string;
  role: string;
}
