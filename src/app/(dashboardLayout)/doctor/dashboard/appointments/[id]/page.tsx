import { getMySingleAppointment } from "@/services/appointment.services";
import DateCell from "@/components/shared/cell/DateCell";
import Link from "next/link";

const DoctorAppointmentDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  const response = await getMySingleAppointment(id);
  const appointment = response.data;
  console.log("Appointment details:", appointment);
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-linear-to-r from-cyan-50 via-white to-blue-50 p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Appointment Details
          </h1>
          <p className="text-sm text-muted-foreground">
            Review the selected appointment, patient details, and schedule.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border p-6">
            <h2 className="text-lg font-semibold">Basic</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Status:</span>{" "}
                {appointment.status || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Payment Status:
                </span>{" "}
                {appointment.paymentStatus || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Video Calling ID:
                </span>{" "}
                {appointment.videoCallingId || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Doctor ID:</span>{" "}
                {appointment.doctorId || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Patient ID:</span>{" "}
                {appointment.patientId || "N/A"}
              </p>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">Created:</span>
                <DateCell
                  date={appointment.createdAt}
                  formatString="MMM dd, yyyy hh:mm a"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">Updated:</span>
                <DateCell
                  date={appointment.updatedAt}
                  formatString="MMM dd, yyyy hh:mm a"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-lg font-semibold">Patient</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {appointment.patient?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {appointment.patient?.email || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Patient ID:</span>{" "}
                {appointment.patient?.id || appointment.patientId || "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-lg font-semibold">Schedule</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">Start:</span>
                <DateCell
                  date={appointment.schedule?.startDateTime}
                  formatString="MMM dd, yyyy hh:mm a"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">End:</span>
                <DateCell
                  date={appointment.schedule?.endDateTime}
                  formatString="MMM dd, yyyy hh:mm a"
                />
              </div>
              <p>
                <span className="font-medium text-foreground">
                  Payment Amount:
                </span>{" "}
                {appointment.payment?.amount != null
                  ? `৳${appointment.payment.amount.toFixed(2)}`
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Schedule ID:
                </span>{" "}
                {appointment.scheduleId || appointment.schedule?.id || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6">
            <h2 className="text-lg font-semibold">Doctor</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {appointment.doctor?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {appointment.doctor?.email || "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Designation:
                </span>{" "}
                {appointment.doctor?.designation || "N/A"}
              </p>
            </div>
          </div>

          <Link
            href="/doctor/dashboard/appointments"
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Back to Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentDetailsPage;
