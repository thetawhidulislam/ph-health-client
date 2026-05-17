import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import React from "react";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* dashboard sidebar */}
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* dashboard navbar */}
        <DashboardNavbar />
        {/* dashboard content */}
        <main className="flex-1 overflow-x-hidden bg-muted/10 p-4 md:p-6 lg:p-8">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
