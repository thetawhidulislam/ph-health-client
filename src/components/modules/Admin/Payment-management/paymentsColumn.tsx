import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { IAppointment } from "@/types/appointment.types";

export const paymentsColumns: ColumnDef<IAppointment>[] = [
  
  {
    id: "doctor",
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.doctor?.name ?? "Unknown Doctor"}
        email={row.original.doctor?.email ?? "unknown@example.com"}
        profilePhoto={row.original.doctor?.profilePhoto}
      />
    ),
  },
  {
    id: "patient",
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.patient?.name ?? "Unknown Patient"}
        email={row.original.patient?.email ?? "unknown@example.com"}
      />
    ),
  },
  {
    id: "schedule",
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => (
      <DateCell
        date={row.original.schedule?.startDateTime}
        formatString="MMM dd, yyyy hh:mm a"
      />
    ),
  },
  {
    id: "amount",
    header: "Amount",
    accessorFn: (row) => row.payment?.amount ?? row.doctor?.appointmentFee ?? 0,
    cell: ({ row }) => {
      const amount = row.original.payment?.amount ?? row.original.doctor?.appointmentFee ?? 0;
      return <span>৳{amount.toFixed(2)}</span>;
    },
  },
  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.payment?.status ?? row.original.paymentStatus ?? "UNPAID";
      const variant =
        status === "PAID"
          ? "default"
          : status === "FAILED"
          ? "destructive"
          : "secondary";
      return <Badge variant={variant}>{String(status)}</Badge>;
    },
  },
  {
    id: "invoice",
    header: "Invoice",
    accessorFn: (row) => row.payment?.invoiceUrl,
    cell: ({ row }) => {
      const invoiceUrl = row.original.payment?.invoiceUrl;
      return invoiceUrl ? (
        <a
          href={invoiceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          View
        </a>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];

export default paymentsColumns;
