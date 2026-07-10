import Link from "next/link";
import { Stethoscope } from "lucide-react";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getUserInfo } from "@/services/auth.service";
import { type UserInfo } from "@/types/user.types";
import { ThemeToggle } from "../theme-toggle";
import { SiteNavbarAuthActions } from "./SiteNavbarAuthActions";
import { SiteNavbarLinks } from "./SiteNavbarLinks";

const publicNavItems = [
  { title: "About", href: "/about" },
  { title: "Consultation", href: "/consultation" },
  { title: "NGOs", href: "/ngos" },
  { title: "Care Plans", href: "/care-plans" },
  { title: "Health Plans", href: "/health-plans" },

  { title: "Diagnostics", href: "/diagnostics" },

  { title: "Contact", href: "/contact" },
];

export async function SiteNavbar() {
  const user = (await getUserInfo()) as UserInfo | null;
  const dashboardHref = user
    ? getDefaultDashboardRoute(
        user.role as "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT",
      )
    : "/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              PH Healthcare
            </p>
            <p className="text-base font-semibold">Care that connects</p>
          </div>
        </Link>

        <SiteNavbarLinks items={publicNavItems} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SiteNavbarAuthActions user={user} dashboardHref={dashboardHref} />
        </div>
      </div>
    </header>
  );
}
