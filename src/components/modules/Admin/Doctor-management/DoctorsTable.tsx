"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DataTable from "@/components/shared/table/DataTable";

import { getDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";

import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { doctorColumns } from "./doctorsColumn";

const DoctorsTable = ({
  queryString,
}: {
  queryString: string;
}) => {
  // const doctorColumns: ColumnDef<IDoctor>[] = [
  //   { accessorKey: "name", header: "Name" },
  //   { accessorKey: "specialization", header: "Specialization" },
  //   { accessorKey: "experience", header: "Experience" },
  //   { accessorKey: "rating", header: "Rating" },
  // ];

  const handleView = (doctor: IDoctor) => {
    // Implement view logic here
    console.log("View doctor:", doctor);
  };
  const handleEdit = (doctor: IDoctor) => {
    // Implement edit logic here
    console.log("Edit doctor:", doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    // Implement delete logic here
    console.log("Delete doctor:", doctor);
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [localQueryString, setLocalQueryString] = useState<string>(queryString || "");

  const normalizedQueryString = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("sortBy")) {
      params.delete("sortOrder");
    }
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    if (!sortBy) {
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSortingState([]);
    } else {
      setSortingState([
        {
          id: sortBy,
          desc: sortOrder === "desc",
        },
      ]);
    }

    setLocalQueryString(normalizedQueryString);
  }, [normalizedQueryString, searchParams]);

  const handleSortingChange = (nextState: SortingState) => {
    setSortingState(nextState);

    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextState.length === 0) {
      nextParams.delete("sortBy");
      nextParams.delete("sortOrder");
    } else {
      const nextSort = nextState[0];
      nextParams.set("sortBy", String(nextSort.id));
      nextParams.set("sortOrder", nextSort.desc ? "desc" : "asc");
    }

    const nextQueryString = nextParams.toString();
    setLocalQueryString(nextQueryString);

    const destination = `${pathname}${nextQueryString ? `?${nextQueryString}` : ""}`;
    router.replace(destination, { scroll: false });
  };

  const { data: doctorsResponse, isFetching, isLoading } = useQuery({
    queryKey: ["doctors", localQueryString],
    queryFn: () => getDoctors(localQueryString),
  });
  const doctors = doctorsResponse?.data || [];
  const tableLoading = isLoading || isFetching;

  return (
    <div>
      <DataTable
        data={doctors || []}
        columns={doctorColumns}
        emptyMesssage="No doctors found."
        isLoading={tableLoading}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
        sorting={{
          state: sortingState,
          onSortingChange: handleSortingChange,
        }}
      />
    </div>
  );
};

export default DoctorsTable;
