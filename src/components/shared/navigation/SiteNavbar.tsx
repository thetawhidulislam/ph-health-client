import Link from "next/link";
import { Stethoscope } from "lucide-react";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getUserInfo } from "@/services/auth.service";
import { type UserInfo } from "@/types/user.types";
import { ThemeToggle } from "../theme-toggle";
import { SiteNavbarAuthActions } from "./SiteNavbarAuthActions";
import { SiteNavbarLinks } from "./SiteNavbarLinks";
import { SiteNavbarMobile } from "./SiteNavbarMobile";

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:h-10 sm:w-10">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
              PH Healthcare
            </p>
            <p className="text-sm font-semibold sm:text-base">Care that connects</p>
          </div>
          <div className="block sm:hidden">
            <p className="text-xs font-semibold">PH</p>
          </div>
        </Link>

        <SiteNavbarLinks items={publicNavItems} />

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <SiteNavbarAuthActions user={user} dashboardHref={dashboardHref} />
          </div>
          <SiteNavbarMobile
            items={publicNavItems}
            user={user}
            dashboardHref={dashboardHref}
          />
        </div>
      </div>
    </header>
  );
}
