import { getDoctorById } from "@/services/doctor.service";
import { getPatientById } from "@/services/patient.service";
import { getUserInfo } from "@/services/auth.service";
import MyProfileForm from "./MyProfileForm";
import { updateMyProfileAction, type ProfileFormValues } from "./_action";

const MyProfilePage = async () => {
  const currentUser = await getUserInfo();

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
        <div className="rounded-lg border border-border bg-background p-8 text-center shadow-sm">
          <p className="text-lg font-medium text-foreground">Unable to load your profile.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please sign in again or contact support.</p>
        </div>
      </div>
    );
  }

  const role = currentUser.role?.toUpperCase();

  const initialValues: ProfileFormValues = {
    name: currentUser.name ?? "",
    email: currentUser.email ?? "",
    contactNumber: "",
    address: "",
    registrationNumber: "",
    appointmentFee: undefined,
    qualification: "",
    currentWorkingPlace: "",
    designation: "",
    gender: "",
  };

  if (role === "DOCTOR") {
    const doctorResponse = await getDoctorById(currentUser.id).catch(() => null);

    if (doctorResponse?.success) {
      const doctor = doctorResponse.data;
      initialValues.name = doctor.name ?? initialValues.name;
      initialValues.email = doctor.email ?? initialValues.email;
      initialValues.contactNumber = doctor.contactNumber ?? "";
      initialValues.address = doctor.address ?? "";
      initialValues.registrationNumber = doctor.registrationNumber ?? "";
      initialValues.gender = doctor.gender ?? "";
      initialValues.appointmentFee = doctor.appointmentFee ?? undefined;
      initialValues.qualification = doctor.qualification ?? "";
      initialValues.currentWorkingPlace = doctor.currentWorkingPlace ?? "";
      initialValues.designation = doctor.designation ?? "";
    }
  }

  if (role === "PATIENT") {
    const patientResponse = await getPatientById(currentUser.id).catch(() => null);

    if (patientResponse?.success) {
      const patient = patientResponse.data;
      initialValues.name = patient.name ?? initialValues.name;
      initialValues.email = patient.email ?? initialValues.email;
      initialValues.contactNumber = patient.contactNumber ?? "";
      initialValues.address = patient.address ?? "";
    }
  }

  return (
    <MyProfileForm
      currentUser={currentUser}
      initialValues={initialValues}
      updateAction={updateMyProfileAction}
    />
  );
};

export default MyProfilePage;
