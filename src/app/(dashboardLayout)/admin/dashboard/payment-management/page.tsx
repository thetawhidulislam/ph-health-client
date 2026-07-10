import PaymentsTable from "@/components/modules/Admin/Payment-management/PaymentsTable";
import { getPayments } from "@/services/payment.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PaymentManagementPage = async ({
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
    queryKey: ["payments", queryString],
    queryFn: () => getPayments(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default PaymentManagementPage;
