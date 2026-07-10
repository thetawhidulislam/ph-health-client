"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IDoctorSpecialtyCategory } from "@/types/speciality.types";

export const doctorSpecialtiesColumns: ColumnDef<IDoctorSpecialtyCategory>[] = [
  {
    accessorKey: "title",
    header: "Specialty",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.icon ? (
          <img
            src={row.original.icon}
            alt={`${row.original.title} icon`}
            className="h-12 w-12 rounded border border-muted-foreground/10 object-cover"
          />
        ) : (
          <div className="text-sm text-muted-foreground">—</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "doctorCount",
    header: "Doctors",
    cell: ({ row }) => <div className="font-medium">{row.original.doctorCount}</div>,
  },
];
