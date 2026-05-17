import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "PH-Healthcare",
  description:
    "A healthcare management system built with Next.js, Tailwind CSS, and TypeScript. Designed to streamline patient care, appointment scheduling, and medical record management for healthcare providers.",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
