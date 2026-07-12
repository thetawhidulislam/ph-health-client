import { redirect } from "next/navigation";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashboard.type";
import React from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/login");
  }
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role as UserRole);

  const dashboardHome = getDefaultDashboardRoute(userInfo.role as UserRole);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;