import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ConsultationDoctorManagementLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      {/* Filter / search bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-full sm:w-72" />
        <Skeleton className="h-10 w-full sm:w-40" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>

      {/* Doctor cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800"
          >
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Skeleton className="size-12 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-28" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
}
