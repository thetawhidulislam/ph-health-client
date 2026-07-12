import { redirect } from "next/navigation";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashboard.type";
import React from "react";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/login");
  }
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);

  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    ></DashboardNavbarContent>
  );
};

export default DashboardNavbar;