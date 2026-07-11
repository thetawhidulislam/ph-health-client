"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Users,
  Pill,
  UserCog,
  Clock,
  UserRound,
  CalendarClock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyDoctorSchedules } from "@/services/doctorSchedule.services";
import { getMyAppointments } from "@/services/appointment.services";
import { getMyPrescriptions } from "@/services/prescription.service";
import { type IAppointment } from "@/types/appointment.types";
import { type IPrescription } from "@/types/prescription.types";
import { type IDoctorSchedule } from "@/types/doctorSchedule.types";

const quickActions = [
  {
    label: "View Appointments",
    href: "/doctor/dashboard/appointments",
    icon: CalendarDays,
  },
  { label: "My Patients", href: "/doctor/dashboard/patients", icon: Users },
  {
    label: "Write Prescription",
    href: "/doctor/dashboard/prescriptions/new",
    icon: Pill,
  },
  { label: "Update Profile", href: "/doctor/dashboard/profile", icon: UserCog },
];

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  COMPLETED: "default",
  SCHEDULED: "outline",
  INPROGRESS: "secondary",
  CANCELED: "destructive",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function parseDate(value?: string | Date | null) {
  return value ? new Date(value) : null;
}

export default function DoctorDashboardPage() {
  const { data: appointmentsRes, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["doctor-my-appointments"],
    queryFn: getMyAppointments,
  });

  const { data: prescriptionsRes, isLoading: prescriptionsLoading } = useQuery({
    queryKey: ["doctor-my-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const { data: doctorSchedulesRes, isLoading: schedulesLoading } = useQuery({
    queryKey: ["doctor-my-schedules"],
    queryFn: () => getMyDoctorSchedules(""),
  });

  const appointments: IAppointment[] = appointmentsRes?.data ?? [];
  const prescriptions: IPrescription[] = prescriptionsRes?.data ?? [];
  const doctorSchedules: IDoctorSchedule[] = doctorSchedulesRes?.data ?? [];

  const today = new Date();

  const todaysSchedule = appointments.filter((appt: IAppointment) => {
    const start = parseDate(appt.schedule?.startDateTime);
    return start && isSameDay(start, today) && appt.status !== "CANCELED";
  });

  const recentAppointments = [...appointments]
    .sort((a: IAppointment, b: IAppointment) => {
      const aTime = parseDate(a.createdAt)?.getTime() ?? 0;
      const bTime = parseDate(b.createdAt)?.getTime() ?? 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  const recentPrescriptions = [...prescriptions]
    .sort((a: IPrescription, b: IPrescription) => {
      const aTime = parseDate(a.createdAt)?.getTime() ?? 0;
      const bTime = parseDate(b.createdAt)?.getTime() ?? 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  const upcomingSchedules = doctorSchedules
    .filter(
      (ds: IDoctorSchedule) =>
        !ds.isBooked &&
        !!ds.schedule?.startDateTime &&
        !!ds.schedule?.endDateTime,
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Card className="border-border/70 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            👋 {getGreeting()}, Doctor
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your appointments, patients, and prescriptions from one
            place.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="border-border/70 transition hover:border-primary hover:shadow-md">
                <CardContent className="flex flex-col items-start gap-3 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Today's Schedule */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : todaysSchedule.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No appointments scheduled for today.
                </p>
              ) : (
                <ul className="divide-y divide-border/70">
                  {todaysSchedule.map((appt: IAppointment) => (
                    <li
                      key={appt.id}
                      className="flex items-center justify-between py-3"
                    >
                      <span className="font-medium">
                        {appt.patient?.name ?? "Unknown"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {parseDate(appt.schedule?.startDateTime)
                          ? parseDate(
                              appt.schedule?.startDateTime,
                            )!.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Unknown"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-lg">Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : recentAppointments.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No recent appointments found.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((appt: IAppointment) => (
                      <TableRow key={appt.id}>
                        <TableCell className="font-medium">
                          {appt.patient?.name ?? "Unknown"}
                        </TableCell>
                        <TableCell>
                          {appt.schedule
                            ? parseDate(appt.schedule.startDateTime)?.toLocaleDateString() ?? "N/A"
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusVariant[appt.status ?? ""] ?? "outline"}
                          >
                            {appt.status ?? "Unknown"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-lg">Recent Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {prescriptionsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : recentPrescriptions.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No prescriptions written yet.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prescription ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPrescriptions.map((rx: IPrescription) => (
                      <TableRow key={rx.id}>
                        <TableCell className="font-mono text-xs">
                          {rx.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {rx.patient?.name ?? "Unknown"}
                        </TableCell>
                        <TableCell>
                          {parseDate(rx.createdAt)?.toLocaleString() ?? "Unknown"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Profile Summary */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-primary" />
                  <span className="font-medium">Your profile</span>
                </div>
                <Link
                  href="/doctor/dashboard/profile"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Complete your profile →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarClock className="h-5 w-5 text-primary" />
                My Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedulesLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : upcomingSchedules.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You haven&apos;t set any schedule yet.
                  </p>
                  <Link
                    href="/doctor/dashboard/schedule"
                    className="inline-block text-sm text-primary hover:underline"
                  >
                    Add availability →
                  </Link>
                </div>
              ) : (
                <ul className="space-y-2 text-sm">
                  {upcomingSchedules.map((ds: IDoctorSchedule, idx: number) => {
                    const start = parseDate(ds.schedule?.startDateTime);
                    const end = parseDate(ds.schedule?.endDateTime);

                    return (
                      <li key={idx} className="flex justify-between">
                        <span className="font-medium">
                          {start ? start.toLocaleDateString() : "Unknown"}
                        </span>
                        <span className="text-muted-foreground">
                          {start
                            ? start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Unknown"}
                          {" - "}
                          {end
                            ? end.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Unknown"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
