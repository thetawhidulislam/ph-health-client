"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getReviews } from "@/services/review.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { reviewsColumns } from "./reviewsColumn";
import ViewReviewDialog from "./ViewReviewDialog";
import { IReview } from "@/types/review.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const ReviewsTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IReview>({ enableEdit: false, enableDelete: false });

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({ searchParams, updateParams });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["reviews", queryString],
    queryFn: () => getReviews(queryString),
  });

  const reviews = data?.data ?? [];

  return (
    <>
      <DataTable
        data={reviews as IReview[]}
        columns={reviewsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No reviews found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search reviews...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={data?.meta}
        actions={tableActions}
      />

      <ViewReviewDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        review={viewingItem}
      />
    </>
  );
};

export default ReviewsTable;
