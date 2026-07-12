"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { httpClient } from "@/lib/axios/httpClient";
import { UserInfo } from "@/types/user.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!refreshToken || !sessionToken) {
      console.error("Refresh token request missing tokens:", {
        refreshToken: Boolean(refreshToken),
        sessionToken: Boolean(sessionToken),
      });
      return false;
    }

    const cookieHeader = [
      `refreshToken=${refreshToken}`,
      `better-auth.session_token=${sessionToken}`,
    ].join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        refreshToken,
        sessionToken,
      }),
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken: newRefreshToken, token } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo(): Promise<UserInfo | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return null;
    }

    try {
      const response = await httpClient.get<UserInfo>("/auth/me");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401 && refreshToken) {
        const refreshed = await getNewTokensWithRefreshToken(refreshToken);
        if (refreshed) {
          const retryResponse = await httpClient.get<UserInfo>("/auth/me");
          return retryResponse.data;
        }
      }

      if (error instanceof AxiosError && error.response?.status === 401) {
        console.error("Failed to fetch user info:", 401, "Unauthorized");
      } else {
        console.error("Error fetching user info:", error);
      }
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
export async function logoutUser(): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const res = await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: [
          accessToken && `accessToken=${accessToken}`,
          refreshToken && `refreshToken=${refreshToken}`,
          sessionToken && `better-auth.session_token=${sessionToken}`,
        ]
          .filter(Boolean)
          .join("; "),
      },
    });

    // Remove cookies from Next.js
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("better-auth.session_token");

    return res.ok;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}
