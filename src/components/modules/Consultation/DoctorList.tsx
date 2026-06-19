"use client";


import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DoctorList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });
  return <div>DoctorListss </div>;
};

export default DoctorList;
