export interface ISpecialty {
  id: string;
  title: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IDoctorSpecialtyCategory {
  id: string;
  title: string;
  icon?: string;
  doctorCount: number;
  createdAt?: string;
  updatedAt?: string;
}
