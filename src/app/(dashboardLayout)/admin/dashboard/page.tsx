import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.service";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const AdminDashboardLayout = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
  // const dashboardData = queryClient.getQueryData([
  //   "admin-dashboard-data",
  // ]) as ApiResponse<iAdminDashboardData>;
  // console.log(dashboardData.data);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  );
};

export default AdminDashboardLayout;
