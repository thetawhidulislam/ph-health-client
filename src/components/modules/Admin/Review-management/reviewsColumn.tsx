import { ColumnDef } from "@tanstack/react-table";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { IReview } from "@/types/review.types";

export const reviewsColumns: ColumnDef<IReview>[] = [
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
    id: "rating",
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <span>{row.original.rating ?? "N/A"} / 5</span>,
  },
  {
    id: "comment",
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => (
      <span className="line-clamp-2 text-sm text-muted-foreground">
        {row.original.comment || "No comment provided"}
      </span>
    ),
  },
  {
    id: "appointment",
    accessorKey: "appointment",
    header: "Appointment",
    cell: ({ row }) => (
      <DateCell
        date={row.original.appointment?.schedule?.startDateTime}
        formatString="MMM dd, yyyy hh:mm a"
      />
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy hh:mm a" />
    ),
  },
];

export default reviewsColumns;
