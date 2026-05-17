import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { getNewTokenWithRefreshToken } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const res = await getNewTokenWithRefreshToken(refreshToken);
    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error, "error Refresh token");
    return false;
  }
}
export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const decodedAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        .data;

    const isValidAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        .success;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }
    const routerOwner = getRouteOwner(pathname);
    const unifySuperAdminAndAdminRole =
      userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

    userRole = unifySuperAdminAndAdminRole;

    const isAuth = isAuthRoute(pathname);

    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken))
    ) {
      const requestHeader = new Headers(request.headers);
      const response = NextResponse.next({
        request: {
          headers: requestHeader,
        },
      });
      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);
        if (refreshed) {
          requestHeader.set("x-token-refreshed", "1");
        }
        return NextResponse.next({
          request: {
            headers: requestHeader,
          },
          headers: response.headers,
        });
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
      return response;
    }
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }
    if (routerOwner === null) {
      return NextResponse.next();
    }

    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }
    if (
      routerOwner === "ADMIN" ||
      routerOwner === "DOCTOR" ||
      routerOwner === "PATIENT"
    ) {
      if (routerOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middlewares:", error);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
