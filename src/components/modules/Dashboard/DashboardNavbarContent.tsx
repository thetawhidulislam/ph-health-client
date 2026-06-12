"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.type";
import { UserInfo } from "@/types/user.types";
import React, { useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { MenuIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-sm text-foreground shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-muted disabled:pointer-events-none disabled:opacity-50">
          <MenuIcon className="w-4 h-4" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <DashboardMobileSidebar
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
          />
        </SheetContent>
      </Sheet>

      {/* search component */}
      <div className="flex-1 flex items-center">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search..." className="pl-9 pr-4" />
        </div>
      </div>

      {/* Right side Actions */}

      {/* notification */}
      <NotificationDropdown />

      {/* user dropdown */}
      <UserDropdown userInfo={userInfo} />
    </>
  );
};

export default DashboardNavbarContent;
