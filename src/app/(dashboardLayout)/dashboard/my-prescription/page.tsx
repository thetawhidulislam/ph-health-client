import DoctorPrescriptionsTable from "@/components/modules/Doctor/DoctorPrescriptions/DoctorPrescriptionsTable";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyPrescriptions } from "@/services/prescription.service";

const MyPrescriptionPage = async ({
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
    queryKey: ["my-prescriptions", queryString],
    queryFn: getMyPrescriptions,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorPrescriptionsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default MyPrescriptionPage;
