import { ColumnDef } from "@tanstack/react-table";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { IPrescription } from "@/types/prescription.types";

export const prescriptionsColumns: ColumnDef<IPrescription>[] = [
  {
    id: "doctor",
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.doctor?.name ?? "Unknown Doctor"}
        email={row.original.doctor?.email ?? "unknown@example.com"}
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
    id: "followUpDate",
    accessorKey: "followUpDate",
    header: "Follow Up",
    cell: ({ row }) => (
      <DateCell date={row.original.followUpDate} formatString="MMM dd, yyyy" />
    ),
  },
  {
    id: "instructions",
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <span className="line-clamp-2 text-sm text-muted-foreground">
        {row.original.instructions || "No instructions provided"}
      </span>
    ),
  },
  {
    id: "pdfUrl",
    header: "PDF",
    accessorFn: (row) => row.pdfUrl,
    cell: ({ row }) => {
      const pdfUrl = row.original.pdfUrl;
      return pdfUrl ? (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          Download
        </a>
      ) : (
        <span className="text-muted-foreground">Unavailable</span>
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

export default prescriptionsColumns;
