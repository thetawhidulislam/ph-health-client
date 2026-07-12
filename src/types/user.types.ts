interface Doctor {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  profilePhoto: string;
  registrationNumber: string;
  gender: string;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
}
interface Patient {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
}
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  doctor?: Doctor;
  patient?: Patient;
}
