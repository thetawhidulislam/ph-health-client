import { IDoctor } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";
import { Star, Phone, CalendarDays, BriefcaseMedical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";

export const doctorColumns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: "name",
    header: "Doctor",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto}
      />
    ),
  },

  {
    accessorKey: "contactNumber",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="h-4 w-4" />
        <span>{row.original.contactNumber || "N/A"}</span>
      </div>
    ),
  },

  {
    accessorKey: "appointmentFee",
    header: "Fee",
    cell: ({ row }) => (
      <Badge variant="secondary">
        ${row.original.appointmentFee?.toFixed(2) || "0.00"}
      </Badge>
    ),
  },

  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BriefcaseMedical className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.experience ?? 0} Years</span>
      </div>
    ),
  },

  {
    accessorKey: "averageRating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">
          {row.original.averageRating?.toFixed(1) || "0.0"}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.gender === "MALE"
            ? "default"
            : row.original.gender === "FEMALE"
              ? "secondary"
              : "outline"
        }
      >
        {row.original.gender || "N/A"}
      </Badge>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>
          <DateCell
            date={row.original.createdAt}
            formatString="MMM dd, yyyy "
          />
        </span>
      </div>
    ),
  },
];
