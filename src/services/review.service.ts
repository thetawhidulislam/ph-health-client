"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IReview } from "@/types/review.types";

const buildUrl = (basePath: string, queryString?: string) =>
  `${basePath}${queryString ? `?${queryString}` : ""}`;

const REVIEW_ENDPOINTS = ["/review", "/reviews"];

export const getReviews = async (queryString?: string) => {
  let lastError: unknown;

  for (const basePath of REVIEW_ENDPOINTS) {
    try {
      const url = buildUrl(basePath, queryString);
      return await httpClient.get<IReview[]>(url);
    } catch (error: unknown) {
      lastError = error;
      const errorResponse =
        error && typeof error === "object" && "response" in error
          ? (error as any).response
          : null;

      if (errorResponse?.status === 404) {
        continue;
      }

      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  console.error("No valid review endpoint found.", REVIEW_ENDPOINTS, lastError);
  throw new Error("Review endpoint not found");
};
