"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Stethoscope,
  CalendarPlus,
  CalendarDays,
  Pill,
  UserCog,
  Clock,
  UserRound,
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
import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.service";
import { getMyAppointments } from "@/services/appointment.services";
import { getMyPrescriptions } from "@/services/prescription.service";
import { type iPatientDashboardData } from "@/types/dashboard.type";
import { type IAppointment } from "@/types/appointment.types";
import { type IPrescription } from "@/types/prescription.types";

const quickActions = [
  {
    label: "Find a Doctor",
    href: "/consultation",
    icon: Stethoscope,
  },
  {
    label: "Book Appointment",
    href: "/book-appointment",
    icon: CalendarPlus,
  },
  {
    label: "My Appointments",
    href: "/dashboard/my-appointments",
    icon: CalendarDays,
  },
  {
    label: "My Prescriptions",
    href: "/dashboard/my-prescriptions",
    icon: Pill,
  },
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

const PatientDashboardPage = () => {
  const { data: appointmentsRes, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["patient-my-appointments"],
    queryFn: getMyAppointments,
  });

  const { data: prescriptionsRes, isLoading: prescriptionsLoading } = useQuery({
    queryKey: ["patient-my-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const appointments: IAppointment[] = appointmentsRes?.data ?? [];
  const prescriptions: IPrescription[] = prescriptionsRes?.data ?? [];

  const { data: dashboardRes, isLoading: dashboardLoading } = useQuery({
    queryKey: ["patient-dashboard-data"],
    queryFn: getDashboardData,
  });

  const dashboardData = dashboardRes?.data as iPatientDashboardData | undefined;
  const statusSegmentCount =
    dashboardData?.appointmentStatusDistribution?.reduce(
      (sum, item) => sum + item.count,
      0,
    ) ?? 0;
  const isDashboardLoading =
    appointmentsLoading || prescriptionsLoading || dashboardLoading;

  const now = new Date();

  const parseSafeDate = (value: string | Date | undefined) =>
    new Date(value ?? 0);

  const upcomingAppointment = [...appointments]
    .filter((appt: IAppointment) => {
      const startDateTime = appt.schedule?.startDateTime;
      return (
        startDateTime != null &&
        parseSafeDate(startDateTime) >= now &&
        appt.status !== "CANCELED" &&
        appt.status !== "COMPLETED"
      );
    })
    .sort(
      (a: IAppointment, b: IAppointment) =>
        parseSafeDate(a.schedule?.startDateTime).getTime() -
        parseSafeDate(b.schedule?.startDateTime).getTime(),
    )[0];

  const recentAppointments = [...appointments]
    .sort(
      (a: IAppointment, b: IAppointment) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5);

  const recentPrescriptions = [...prescriptions]
    .sort(
      (a: IPrescription, b: IPrescription) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Card className="border-border/70 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            👋 {getGreeting()}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your appointments, prescriptions, and profile from one place.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {isDashboardLoading ? (
            <>
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </>
          ) : (
            <>
              <StatsCard
                title="Appointments"
                value={dashboardData?.appointmentCount ?? 0}
                iconName="CalendarDays"
                description="Total appointments booked."
              />
              <StatsCard
                title="Reviews"
                value={dashboardData?.reviewCount ?? 0}
                iconName="Star"
                description="Total reviews received."
              />
              <StatsCard
                title="Next Appointment"
                value={
                  upcomingAppointment
                    ? parseSafeDate(
                        upcomingAppointment.schedule?.startDateTime,
                      ).toLocaleDateString()
                    : "None"
                }
                iconName="Clock"
                description="Your next scheduled appointment."
              />
              <StatsCard
                title="Status Segments"
                value={statusSegmentCount}
                iconName="PieChart"
                description="Appointment status categories."
              />
            </>
          )}
        </div>

        <AppointmentPieChart
          data={dashboardData?.appointmentStatusDistribution ?? []}
          title="Appointment Distribution"
          description="Current appointment status breakdown."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Upcoming Appointment */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Upcoming Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <Skeleton className="h-16 w-full" />
              ) : !upcomingAppointment ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No upcoming appointments.
                  </p>
                  <Link
                    href="/consultation"
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    Book an appointment →
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                  <div>
                    <p className="font-medium">
                      Dr. {upcomingAppointment.doctor?.name ?? "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {parseSafeDate(
                        upcomingAppointment.schedule!.startDateTime,
                      ).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <Badge
                    variant={
                      statusVariant[upcomingAppointment.status ?? ""] ??
                      "outline"
                    }
                  >
                    {upcomingAppointment.status}
                  </Badge>
                </div>
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
                  No appointments found.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((appt: IAppointment) => (
                      <TableRow key={appt.id}>
                        <TableCell className="font-medium">
                          Dr. {appt.doctor?.name ?? "Unknown"}
                        </TableCell>
                        <TableCell>
                          {appt.schedule?.startDateTime
                            ? parseSafeDate(
                                appt.schedule.startDateTime,
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusVariant[appt.status ?? ""] ?? "outline"
                            }
                          >
                            {appt.status}
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
                  No prescriptions found.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prescription ID</TableHead>
                      <TableHead>Doctor</TableHead>
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
                          Dr. {rx.doctor?.name ?? "Unknown"}
                        </TableCell>
                        <TableCell>
                          {parseSafeDate(rx.createdAt).toLocaleString()}
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
                  href="/my-profile"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <UserCog className="h-4 w-4" />
                  Update profile →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick tip / empty-state-friendly card */}
          <Card className="border-border/70 bg-muted/30">
            <CardContent className="p-5">
              <p className="text-sm font-medium">Need to see a doctor?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse specialists and book an appointment in a few clicks.
              </p>
              <Link
                href="/consultation"
                className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Stethoscope className="h-4 w-4" />
                Browse doctors →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardPage;
