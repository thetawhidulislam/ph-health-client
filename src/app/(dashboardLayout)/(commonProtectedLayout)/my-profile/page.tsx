import { getUserInfo } from "@/services/auth.service";
import MyProfileForm from "./MyProfileForm";
import { updateMyProfileAction, type ProfileFormValues } from "./_action";

const MyProfilePage = async () => {
  const currentUser = await getUserInfo();
  const doctorinfo = currentUser?.doctor;
  const patientinfo = currentUser?.patient;

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
        <div className="rounded-lg border border-border bg-background p-8 text-center shadow-sm">
          <p className="text-lg font-medium text-foreground">
            Unable to load your profile.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in again or contact support.
          </p>
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
    profilePhoto: "",
    registrationNumber: "",
    appointmentFee: undefined,
    qualification: "",
    currentWorkingPlace: "",
    designation: "",
    gender: "",
  };

  if (role === "DOCTOR" && doctorinfo) {
    initialValues.name = doctorinfo.name ?? initialValues.name;
    initialValues.email = doctorinfo.email ?? initialValues.email;
    initialValues.contactNumber = doctorinfo.contactNumber ?? "";
    initialValues.address = doctorinfo.address ?? "";
    initialValues.profilePhoto = doctorinfo.profilePhoto ?? "";
    initialValues.registrationNumber = doctorinfo.registrationNumber ?? "";
    initialValues.gender = doctorinfo.gender ?? "";
    initialValues.appointmentFee = doctorinfo.appointmentFee ?? undefined;
    initialValues.qualification = doctorinfo.qualification ?? "";
    initialValues.currentWorkingPlace = doctorinfo.currentWorkingPlace ?? "";
    initialValues.designation = doctorinfo.designation ?? "";
  }

  if (role === "PATIENT" && patientinfo) {
    initialValues.name = patientinfo.name ?? initialValues.name;
    initialValues.email = patientinfo.email ?? initialValues.email;
    initialValues.profilePhoto =
      patientinfo.profilePhoto ?? initialValues.profilePhoto;
    initialValues.contactNumber = patientinfo.contactNumber ?? "";
    initialValues.address = patientinfo.address ?? "";
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
