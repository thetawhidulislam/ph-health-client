"use client";

import { useRouter } from "next/navigation";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type UserInfo } from "@/types/user.types";

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
        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Sign in
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
          {user.name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <span className="hidden sm:block">{user.name}</span>

        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <h4 className="font-medium">{user.name}</h4>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(dashboardHref)}
          className="cursor-pointer"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/my-profile")}
          className="cursor-pointer"
        >
          <UserRound className="h-4 w-4" />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => router.push("/logout")}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}