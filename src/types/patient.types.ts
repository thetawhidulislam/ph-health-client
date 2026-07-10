export interface IPatient {
  id: number;
  name: string;
  email?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  createdAt?: Date;
  user?: {
    status?: string;
  };
}

export interface IPatientDetails extends IPatient {
  user?: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    status?: string;
    emailVerified?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
}
