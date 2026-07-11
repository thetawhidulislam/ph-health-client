import QueryProviders from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
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
    <html suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            {children}
          </QueryProviders>

          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}