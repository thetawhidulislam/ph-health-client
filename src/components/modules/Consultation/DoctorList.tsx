"use client";

import { getDoctors } from "@/app/(commonLayout)/consultation/_action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DoctorList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });
  console.log(data);
  return <div>DoctorListss </div>;
};

export default DoctorList;
