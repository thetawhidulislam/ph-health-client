"use client";

import { NavSection } from "@/types/dashboard.type";
import { UserInfo } from "@/types/user.types";

import React, { useState } from "react";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}
const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile menu toggle icon */}

      {/* search component */}

      {/* Right side Actions */}

      {/* notification */}

      {/* user dropdown */}
    </>
  );
};

export default DashboardNavbarContent;
