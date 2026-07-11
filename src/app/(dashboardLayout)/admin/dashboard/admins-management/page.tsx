import AdminsTable from "@/components/modules/Admin/Admin-management/AdminsTable";
import { getAdmins } from "@/services/admin.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminManagementPage = async ({
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
    queryKey: ["admins", queryString],
    queryFn: () => getAdmins(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
};

export default AdminManagementPage;