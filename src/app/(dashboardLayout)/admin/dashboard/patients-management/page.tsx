

import PatientsTable from "@/components/modules/Admin/Patient-management/PatientsTable";
import { getPatients } from "@/services/patient.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PatientsManagementPage = async ({ searchParams }: {
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
    queryKey: ["patients", queryString],
    queryFn: () => getPatients(queryString),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PatientsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default PatientsManagementPage;
