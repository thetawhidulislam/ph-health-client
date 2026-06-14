import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import React from "react";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <DashboardNavbar />
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
