import DoctorsTable from "@/components/modules/Admin/Doctor-management/DoctorsTable";
import { getDoctors } from "@/services/doctor.service";
import { getSpecialities } from "@/services/speciality.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const DoctorsManagementPage = async ({
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
    queryKey: ["doctors", queryString],
    queryFn: () => getDoctors(queryString),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const specialities = await getSpecialities();

  await queryClient.prefetchQuery({
    queryKey: ["specialities"],
    queryFn: () => specialities,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default DoctorsManagementPage;
