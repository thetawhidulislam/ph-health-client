"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { iDashboardData } from "@/types/dashboard.type";

export async function getDashboardData() {
  try {
    const response = await httpClient.get<ApiResponse<iDashboardData>>("/stats");

    return response;
  } catch (error) {
    console.log("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
