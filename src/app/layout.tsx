import QueryProviders from "@/providers/QueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PH-Healthcare",
  description:
    "A healthcare management system built with Next.js, Tailwind CSS, and TypeScript. Designed to streamline patient care, appointment scheduling, and medical record management for healthcare providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
