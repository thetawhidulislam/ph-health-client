import { format } from "date-fns";

interface DateCellProps {
  date?: string | Date | null;
  formatString?: string;
}
const DateCell = ({ date, formatString }: DateCellProps) => {
  if (!date) {
    return <div className="text-muted-foreground text-sm">-</div>;
  }
  const formattedDate = format(new Date(date), formatString || "MMM dd, yyyy");
  return <div className="text-sm">{formattedDate}</div>;
};

export default DateCell;
