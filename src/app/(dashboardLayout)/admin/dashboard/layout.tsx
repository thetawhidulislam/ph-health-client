

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>Dashboard Layout</p>
      {children}
    </>
  );
}
