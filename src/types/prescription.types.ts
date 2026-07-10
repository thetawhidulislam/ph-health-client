export interface IPrescriptionPerson {
  id?: string;
  name?: string;
  email?: string;
}

export interface IPrescriptionAppointment {
  id?: string;
  schedule?: {
    id?: string;
    startDateTime?: string | Date;
    endDateTime?: string | Date;
  };
}

export interface IPrescription {
  id: string;
  appointmentId?: string;
  doctorId?: string;
  patientId?: string;
  instructions?: string;
  followUpDate?: string | Date;
  pdfUrl?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  doctor?: IPrescriptionPerson | null;
  patient?: IPrescriptionPerson | null;
  appointment?: IPrescriptionAppointment | null;
}
