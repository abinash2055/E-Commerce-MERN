import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;
    const hasToken = request.cookies.has("access_token");

    // If no token and not on /auth, redirect to login
    if (!hasToken) {
      if (!pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
      }

      // Allow access to auth routes
      return NextResponse.next();
    }

    // If token exists, verify it
    const access_token = request.cookies.get("access_token").value;
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );
    const role = payload.role;

    // Prevent logged-in users from accessing /auth pages
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl)
      );
    }

    // Admin route protection
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    //  User route protection
    if (pathname.startsWith("/my-account") && role !== "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    //  Everything is fine, allow the request
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
