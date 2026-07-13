"use client";

import DataTable from "@/components/shared/table/DataTable";
import { PaginationMeta } from "@/types/api.types";
import { IPatient } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { patientColumns } from "./patientsColumn";
import { getPatients } from "@/services/patient.service";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import BanPatientConfirmationDialog from "./BanPatientConfirmationDialog";
import ViewPatientProfileDialog from "./ViewPatientProfileDialog";
import DeletePatientConfirmationDialog from "./DeletePatientConfirmationDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const PatientsTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

  const {
    viewingItem,
    deletingItem,
    isViewDialogOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IPatient>({ enableEdit: false });

  const queryString = initialQueryString || "";

  const {
    data: patientDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["patients", queryString],
    queryFn: () => getPatients(queryString),
  });

  const patients = patientDataResponse?.data ?? [];
  const meta: PaginationMeta | undefined = patientDataResponse?.meta;

  return (
    <>
      <DataTable
        data={patients}
        columns={patientColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No patients found."
        meta={meta}
        actions={tableActions}
      />

      {/* <BanPatientConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        patient={deletingItem}
      /> */}
      <DeletePatientConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        patient={deletingItem}
      />

      <ViewPatientProfileDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        patient={viewingItem}
      />
    </>
  );
};

export default PatientsTable;
