import { IPatient } from "@/types/patient.types";
import { ColumnDef } from "@tanstack/react-table";
import { Phone, CalendarDays } from "lucide-react";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";

export const patientColumns: ColumnDef<IPatient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto}
      />
    ),
  },

  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    enableSorting: false,
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="h-4 w-4" />
        <span>{row.original.contactNumber || "N/A"}</span>
      </div>
    ),
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadgeCell status={row.original.user?.status} />,
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>
          <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy " />
        </span>
      </div>
    ),
  },
];
