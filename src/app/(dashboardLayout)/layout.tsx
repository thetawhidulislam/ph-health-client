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
      <div className="flex flex-col md:flex-row min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-x-auto w-full px-3 py-3 sm:px-4 sm:py-4 md:p-4 lg:p-6">
          <DashboardNavbar />
          <div className="mt-4 sm:mt-6">{children}</div>
  
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
