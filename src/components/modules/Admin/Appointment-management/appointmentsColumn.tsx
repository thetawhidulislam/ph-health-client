import { ColumnDef } from "@tanstack/react-table";
import { IAppointment } from "@/types/appointment.types";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";

export const appointmentColumns: ColumnDef<IAppointment>[] = [
  {
    id: "doctor",
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.doctor?.name}
        email={row.original.doctor?.email}
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
        name={row.original.patient?.name}
        email={row.original.patient?.email}
      />
    ),
  },

  {
    id: "schedule",
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => (
      <DateCell date={row.original.schedule?.startDateTime} formatString="MMM dd, yyyy hh:mm a" />
    ),
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "N/A";
      const variant =
        status === "COMPLETED"
          ? "default"
          : status === "CANCELED"
          ? "destructive"
          : "secondary";

      return <Badge variant={variant}>{String(status)}</Badge>;
    },
  },

  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const ps = row.original.paymentStatus ?? "N/A";
      const variant = ps === "PAID" ? "default" : ps === "FAILED" ? "destructive" : "secondary";
      return <Badge variant={variant}>{String(ps)}</Badge>;
    },
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />, 
  },
];

export default appointmentColumns;
