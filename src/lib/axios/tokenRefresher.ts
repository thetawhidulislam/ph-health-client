"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

import { cookies } from "next/headers";

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

    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
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
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}
