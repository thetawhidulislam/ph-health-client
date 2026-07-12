import { IAdmin } from "@/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import { Phone, CalendarDays } from "lucide-react";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import { Badge } from "@/components/ui/badge";
import DateCell from "@/components/shared/cell/DateCell";
import { UserStatus } from "@/types/doctor.types";

export const adminColumns: ColumnDef<IAdmin>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Admin",
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
    id: "role",
    accessorFn: (row) => row.user?.role,
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.user?.role ?? "N/A"}</Badge>
    ),
  },
  {
    id: "status",
    accessorFn: (row) => row.user?.status,
    header: "Status",
    cell: ({ row }) => (
      <StatusBadgeCell
        status={row.original.user?.status ?? UserStatus.BLOCKED}
      />
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>
          <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
        </span>
      </div>
    ),
  },
];
