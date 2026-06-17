"use client";

import AppointmentBarChart from "@/components/shared/AppointmentBarChart";
import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.service";
import { ApiResponse } from "@/types/api.types";
import { iAdminDashboardData } from "@/types/dashboard.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminDashboardContent = () => {
  const { data: adminDashboardData, isLoading } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always",
  });

  const response = adminDashboardData as ApiResponse<iAdminDashboardData> | undefined;
  const data = response?.data;

  // Handle Loading States Gracefully with Skeletons
  if (isLoading) {
    return (
      <div className="space-y-6 p-4 sm:p-6 max-w-400 mx-auto animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-87.5 lg:col-span-2 bg-muted rounded-xl" />
          <div className="h-87.5 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  // Safely format currency numbers
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-400 mx-auto text-foreground">
      
      {/* Header Block */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Real-time platform overview, user registrations, and metrics.
        </p>
      </div>

      {/* --- Main Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Prominent Revenue Card - Spans 2 cols on wide screens */}
        <div className="sm:col-span-2 lg:col-span-2">
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(data?.totalRevenue || 0)}
            iconName="CurrencyDollar"
            description="Total revenue generated from appointments and platform payments."
            className="border-primary/20 bg-linear-to-br from-card to-primary/1"
          />
        </div>

        <StatsCard
          title="Total Appointments"
          value={data?.appointmentCount || 0}
          iconName="CalendarDays"
          description="Total number of scheduled appointments."
        />

        <StatsCard
          title="Total Payments"
          value={data?.paymentCount || 0}
          iconName="CreditCard"
          description="Total number of processed payments."
        />

        <StatsCard
          title="Total Patients"
          value={data?.patientCount || 0}
          iconName="Users"
          description="Total number of registered patients."
        />

        <StatsCard
          title="Total Doctors"
          value={data?.doctorCount || 0}
          iconName="Doctor"
          description="Total medical providers registered."
        />

        <StatsCard
          title="Total Admins"
          value={(data?.adminCount || 0) + (data?.superAdminCount || 0)}
          iconName="ShieldCheck"
          description={`${data?.adminCount || 0} System / ${data?.superAdminCount || 0} Super Admins.`}
        />

        <StatsCard
          title="Total Active Users"
          value={data?.userCount || 0}
          iconName="Users"
          description="Total user accounts active on the system."
        />
      </div>

      {/* --- Charts Layout Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Bar Chart takes more weight space (2/3) */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 tracking-tight">Appointment Trends</h2>
          <AppointmentBarChart data={data?.barChartData || []} />
        </div>

        {/* Pie Chart takes remaining space (1/3) */}
        <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 tracking-tight">Distribution Breakdown</h2>
          <AppointmentPieChart data={data?.pieChartData || []} />
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardContent;