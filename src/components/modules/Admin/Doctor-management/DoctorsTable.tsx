"use client";
import DataTable from "@/components/shared/table/DataTable";

import { getDoctors } from "@/services/doctor.service";
import { IDoctor } from "@/types/doctor.types";

import { useQuery } from "@tanstack/react-query";
import { doctorColumns } from "./doctorsColumn";

const DoctorsTable = ({
  queyrString,
  queryParamsObject,
}: {
  queyrString: string;
  queryParamsObject: { [key: string]: string | string[] | undefined };
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
  const { data: doctorsDataResponse, isLoading } = useQuery({
    queryKey: ["doctors", queryParamsObject],
    queryFn: () => getDoctors(queyrString),
  });
  const { data: doctors } = doctorsDataResponse! || [];

  return (
    <div>
      <DataTable
        data={doctors || []}
        columns={doctorColumns}
        emptyMesssage="No doctors found."
        isLoading={isLoading}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />
    </div>
  );
};

export default DoctorsTable;
