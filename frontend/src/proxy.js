import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

export async function proxy(request) {
  const sessionCookie = request.cookies.get("refashion.sid");
  const { pathname } = request.nextUrl;

  const isPublicPage =
    pathname === "/" || pathname === "/login" || pathname === "/register";
  const isAdminPage = pathname.startsWith("/admin");
  const isUserDashboard = pathname.startsWith("/dashboard");

  if (!sessionCookie) {
    if (isAdminPage || isUserDashboard) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/auth/get`, {
      headers: {
        Cookie:
          request.headers.get("cookie") ||
          `refashion.sid=${sessionCookie.value}`,
      },
      withCredentials: true,
    });

    const user = response.data?.user || response.data;
    const role = user?.role?.toLowerCase();

    if (isPublicPage) {
      const target = role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (isAdminPage && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isUserDashboard && role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      error.response?.status || error.message,
    );

    if (isAdminPage || isUserDashboard) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("refashion.sid");
      return res;
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/admin/:path*"],
};
