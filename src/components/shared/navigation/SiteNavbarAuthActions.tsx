"use client";

import { useRouter } from "next/navigation";

import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type UserInfo } from "@/types/user.types";
import { logoutUser } from "@/services/auth.service";
import { toast } from "sonner";

interface SiteNavbarAuthActionsProps {
  user: UserInfo | null;
  dashboardHref?: string;
}

export function SiteNavbarAuthActions({
  user,
  dashboardHref = "/dashboard",
}: SiteNavbarAuthActionsProps) {
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 sm:h-10 sm:px-4 sm:text-sm"
      >
        Sign in
      </button>
    );
  }

  const handleLogout = async () => {
    const success = await logoutUser();

    if (success) {
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } else {
      toast.error("Logout failed");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs font-medium hover:bg-muted sm:gap-2 sm:px-3 sm:py-2 sm:text-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary sm:h-8 sm:w-8 sm:text-sm">
          {user.name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <span className="hidden sm:block">{user.name}</span>

        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 sm:w-60">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <h4 className="text-sm font-medium sm:text-base">{user.name}</h4>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(dashboardHref)}
          className="cursor-pointer text-xs sm:text-sm"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/my-profile")}
          className="cursor-pointer text-xs sm:text-sm"
        >
          <UserRound className="h-4 w-4" />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer text-xs sm:text-sm"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
