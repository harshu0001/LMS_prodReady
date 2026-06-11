import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Read token from secure cookies
  const token = request.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;
  
  const isAdminRoute = pathname.startsWith("/admin");
  const isInstructorRoute = pathname.startsWith("/instructor");
  const isStudentRoute = pathname.startsWith("/student");
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  
  // 1. Redirect unauthenticated users to login
  if ((isAdminRoute || isInstructorRoute || isStudentRoute) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // 2. Redirect authenticated users away from login/signup to their dashboard
  if (isAuthRoute && user) {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (user.role === "INSTRUCTOR") {
      return NextResponse.redirect(new URL("/instructor/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }
  
  // 3. Enforce Portal Access Rules based on Role
  if (user) {
    // Only ADMIN allowed in /admin
    if (isAdminRoute && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    // Only INSTRUCTOR and ADMIN allowed in /instructor
    if (isInstructorRoute && user.role !== "INSTRUCTOR" && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};
