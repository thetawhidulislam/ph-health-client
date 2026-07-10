import DoctorSpecialtiesTable from "@/components/modules/Admin/DoctorSpecialtiesManagement/DoctorSpecialtiesTable";
import { getDoctors } from "@/services/doctor.service";
import { getSpecialities } from "@/services/speciality.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const DoctorSpecialtiesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObject = await searchParams;

  const queryString = Object.keys(queryParamsObject)
    .map((key) => {
      const value = queryParamsObject[key];

      if (value === undefined) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          )
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctor-specialties", queryString],
    queryFn: () => getSpecialities(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  await queryClient.prefetchQuery({
    queryKey: ["doctor-specialty-counts"],
    queryFn: () => getDoctors("page=1&limit=1000"),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DoctorSpecialtiesTable initialQueryString={queryString} />
      </section>
    </HydrationBoundary>
  );
};

export default DoctorSpecialtiesManagementPage;
