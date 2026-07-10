"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { ISpecialty } from "@/types/speciality.types";
import { ColumnDef } from "@tanstack/react-table";

export const specialtiesColumns: ColumnDef<ISpecialty>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => <DateCell date={row.original.updatedAt} />,
  },
];
