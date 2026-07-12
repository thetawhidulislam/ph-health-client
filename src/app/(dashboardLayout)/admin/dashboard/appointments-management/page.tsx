import AppointmentsTable from "@/components/modules/Admin/Appointment-management/AppointmentsTable";
import { getAllAppointments } from "@/services/appointment.services";
import { getUserInfo } from "@/services/auth.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AppointmentsManagementPage = async ({
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
    queryKey: ["appointments", queryString],
    queryFn: () => getAllAppointments(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const currentUser = await getUserInfo();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentsTable
        initialQueryString={queryString}
        currentUser={currentUser ?? undefined}
      />
    </HydrationBoundary>
  );
};

export default AppointmentsManagementPage;
