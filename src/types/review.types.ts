export interface IReviewPatient {
  id?: string;
  name?: string;
  email?: string;
}

export interface IReviewDoctor {
  id?: string;
  name?: string;
  email?: string;
}

export interface IReviewAppointment {
  id?: string;
  schedule?: {
    id?: string;
    startDateTime?: string | Date;
    endDateTime?: string | Date;
  };
}

export interface IReview {
  id: string;
  rating?: number;
  comment?: string;
  appointmentId?: string;
  patientId?: string;
  doctorId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  patient?: IReviewPatient | null;
  doctor?: IReviewDoctor | null;
  appointment?: IReviewAppointment | null;
}
