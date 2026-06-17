"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";

import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

/**
 export interface IDoctor{
    id: number;
    name:string;
    specialization:string;
    experience:number;
    rating:number;
}
 */
const DoctorsTable = () => {
  const doctorColumns: ColumnDef<IDoctor>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "experience", header: "Experience" },
    { accessorKey: "rating", header: "Rating" },
  ];

  const { data: doctorsDataResponse } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const { data: doctors } = doctorsDataResponse! || [];
  // eslint-disable-next-line react-hooks/incompatible-library
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: doctors || [],
    columns: doctorColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableHead key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorsTable;
