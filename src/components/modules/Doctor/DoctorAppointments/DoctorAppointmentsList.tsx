import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type IAppointment } from "@/types/appointment.types";
import { format } from "date-fns";
import { CalendarClock, CircleDollarSign } from "lucide-react";
import Link from "next/link";

interface DoctorAppointmentsListProps {
  appointments: IAppointment[];
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return format(date, "MMM dd, yyyy • hh:mm a");
};

const DoctorAppointmentsList = ({ appointments }: DoctorAppointmentsListProps) => {
  const sortedAppointments = [...appointments].sort((left, right) => {
    const leftValue = new Date(left.schedule?.startDateTime ?? left.createdAt ?? 0).getTime();
    const rightValue = new Date(right.schedule?.startDateTime ?? right.createdAt ?? 0).getTime();
    return rightValue - leftValue;
  });

  const upcomingCount = appointments.filter(
    (item) => item.status === "SCHEDULED" || item.status === "INPROGRESS",
  ).length;
  const completedCount = appointments.filter((item) => item.status === "COMPLETED").length;
  const canceledCount = appointments.filter((item) => item.status === "CANCELED").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-linear-to-r from-cyan-50 via-white to-blue-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">My Appointments</h1>
            <p className="text-sm text-muted-foreground">
              View your patient appointments, appointment status, and scheduled times.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">Total: {appointments.length}</Badge>
            <Badge variant="secondary">Upcoming: {upcomingCount}</Badge>
            <Badge variant="secondary">Completed: {completedCount}</Badge>
            <Badge variant="secondary">Canceled: {canceledCount}</Badge>
          </div>
        </div>
      </div>

      {sortedAppointments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No appointments yet</CardTitle>
            <CardDescription>
              You have no appointment records. Once appointments are created, they will appear here.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/doctor/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              Back to dashboard
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="gap-4">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle>
                      {appointment.patient?.name || "Patient appointment"}
                    </CardTitle>
                    <CardDescription>
                      {appointment.patient?.email || "Email not available"}
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">{appointment.status || "SCHEDULED"}</Badge>
                    <Badge
                      variant={
                        appointment.paymentStatus === "PAID" ? "secondary" : "outline"
                      }
                    >
                      {appointment.paymentStatus || "UNPAID"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <CalendarClock className="size-4" />
                      Schedule
                    </div>
                    <p className="font-medium">
                      {formatDateTime(appointment.schedule?.startDateTime)}
                    </p>
                    <p className="text-muted-foreground">
                      Ends {formatDateTime(appointment.schedule?.endDateTime)}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <CircleDollarSign className="size-4" />
                      Payment
                    </div>
                    
                    <p className="text-muted-foreground">
                      {appointment.paymentStatus || "UNPAID"}
                    </p>
                    {appointment.payment?.transactionId ? (
                      <p className="text-muted-foreground">
                        Transaction {appointment.payment.transactionId}
                      </p>
                    ) : null}
                  </div>
                </div>

              </CardContent>

              <CardFooter className="justify-end gap-3">
                <Link
                  href={`/doctor/dashboard/appointments/${appointment.id}`}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  View details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentsList;
