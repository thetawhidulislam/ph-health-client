"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { iAdminDashboardData } from "@/types/dashboard.type";

export async function getDashboardData() {
  try {
    const response = await httpClient.get<iAdminDashboardData>("/stats");

    return response;
  } catch (error) {
    console.log("Error fetching dashboard data:", error);
    return {
      data: null,
      success: false,
      message: "Failed to fetch dashboard data",
      meta: null,
    };
  }
}
