import DoctorAppointmentsList from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentsList";
import { getMyAppointments } from "@/services/appointment.services";

const DoctorAppointmentsPage = async () => {
  const response = await getMyAppointments();

  return <DoctorAppointmentsList appointments={response.data} />;
};

export default DoctorAppointmentsPage;
