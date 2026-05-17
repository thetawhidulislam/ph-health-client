"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not found");
}
export async function getNewTokenWithRefreshToken(refreshToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!res.ok) {
      return false;
    }
    const data = await res.json();

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
    console.log(error, "error Refresh token");
    return false;
  }
}
