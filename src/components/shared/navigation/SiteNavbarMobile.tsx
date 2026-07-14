"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { type UserInfo } from "@/types/user.types";
import { logoutUser } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SiteNavbarMobileProps {
  items: Array<{ title: string; href: string }>;
  user: UserInfo | null;
  dashboardHref: string;
}

export function SiteNavbarMobile({
  items,
  user,
  dashboardHref,
}: SiteNavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } else {
      toast.error("Logout failed");
    }
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground active:bg-muted/80"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 top-14 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="presentation"
          />

          {/* Mobile menu */}
          <div className="fixed left-0 right-0 top-14 z-50 max-h-[calc(100vh-56px)] overflow-y-auto border-b border-border bg-background/98 backdrop-blur-md scrollbar-hide">
            <div className="mx-auto w-full px-3 py-4 sm:px-4 sm:py-6">
              {/* Navigation Links */}
              <nav className="mb-4 flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium transition active:bg-muted hover:bg-muted/50"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Divider */}
              <div className="my-4 border-t border-border" />

              {/* User Section */}
              {user ? (
                <div className="space-y-2">
                  {/* User Info */}
                  <div className="rounded-lg bg-muted/50 px-4 py-3">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  {/* Dashboard Button */}
                  <button
                    onClick={() => handleNavClick(dashboardHref)}
                    className="w-full rounded-lg px-4 py-3 text-left text-base font-medium transition active:bg-muted hover:bg-muted/50"
                  >
                    Dashboard
                  </button>

                  {/* Profile Button */}
                  <button
                    onClick={() => handleNavClick("/my-profile")}
                    className="w-full rounded-lg px-4 py-3 text-left text-base font-medium transition active:bg-muted hover:bg-muted/50"
                  >
                    My Profile
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg px-4 py-3 text-left text-base font-medium text-destructive transition active:bg-destructive/10 hover:bg-destructive/5"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick("/login")}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground transition active:bg-primary/80 hover:bg-primary/90"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
