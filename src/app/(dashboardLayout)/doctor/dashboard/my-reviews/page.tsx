import ReviewsTable from "@/components/modules/Admin/Review-management/ReviewsTable";
import { getMyReviews } from "@/services/review.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ReviewManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObject = await searchParams;
  const queryString = Object.keys(queryParamsObject)
    .map((key) => {
      const value = queryParamsObject[key];
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-reviews", queryString],
    queryFn: () => getMyReviews(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default ReviewManagementPage;
