"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";

export const getDoctors = async (queyrString: string) => {
  try {
    const doctors = await httpClient.get<IDoctor[]>(
      queyrString ? `/doctors?${queyrString}` : "/doctors",
    );
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};
