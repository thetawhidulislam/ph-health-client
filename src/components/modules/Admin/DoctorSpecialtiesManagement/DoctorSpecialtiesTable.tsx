"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getDoctors } from "@/services/doctor.service";
import { getSpecialities } from "@/services/speciality.service";
import { PaginationMeta } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { IDoctorSpecialtyCategory, ISpecialty } from "@/types/speciality.types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { doctorSpecialtiesColumns } from "./doctorSpecialtiesColumns";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const DoctorSpecialtiesTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

  const {
    queryStringFromUrl,
    isRouteRefreshPending,
    updateParams,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const {
    data: specialtiesResponse,
    isLoading: isLoadingSpecialties,
    isFetching: isFetchingSpecialties,
  } = useQuery({
    queryKey: ["doctor-specialties", queryString],
    queryFn: () => getSpecialities(queryString),
  });

  const {
    data: doctorsResponse,
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
  } = useQuery({
    queryKey: ["doctor-specialty-counts"],
    queryFn: () => getDoctors("page=1&limit=1000"),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  const specialties = specialtiesResponse?.data ?? [];
  const doctors = doctorsResponse?.data ?? [];

  const doctorCountBySpecialty = useMemo(() => {
    const countMap = new Map<string, number>();

    doctors.forEach((doctor: IDoctor) => {
      doctor.specialities?.forEach((specialtyLink) => {
        const specialtyId = specialtyLink.specialty?.id || specialtyLink.specialtyId;
        if (!specialtyId) {
          return;
        }

        const current = countMap.get(specialtyId) ?? 0;
        countMap.set(specialtyId, current + 1);
      });
    });

    return countMap;
  }, [doctors]);

  const specialtyCategories = useMemo<IDoctorSpecialtyCategory[]>(() => {
    return specialties.map((specialty: ISpecialty) => ({
      ...specialty,
      doctorCount: doctorCountBySpecialty.get(specialty.id) ?? 0,
    }));
  }, [doctorCountBySpecialty, specialties]);

  const isLoading =
    isLoadingSpecialties ||
    isLoadingDoctors ||
    isFetchingSpecialties ||
    isFetchingDoctors ||
    isRouteRefreshPending;

  return (
    <DataTable
      data={specialtyCategories}
      columns={doctorSpecialtiesColumns}
      isLoading={isLoading}
      emptyMessage="No doctor specialties found."
      search={{
        initialValue: searchTermFromUrl,
        placeholder: "Search doctor specialties...",
        debounceMs: 700,
        onDebouncedChange: handleDebouncedSearchChange,
      }}
    />
  );
};

export default DoctorSpecialtiesTable;
