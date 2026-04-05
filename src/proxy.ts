import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/trainer": ["ADMIN", "TRAINER"],
  "/student": ["ADMIN", "STUDENT"],
  "/mentor": ["ADMIN", "MENTOR"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if route is protected
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!req.auth?.user) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const userRole = (req.auth.user as { role: string }).role;
      if (!roles.includes(userRole)) {
        // Redirect to the user's appropriate dashboard
        const redirectPath = {
          ADMIN: "/admin",
          TRAINER: "/trainer",
          STUDENT: "/student",
          MENTOR: "/mentor",
        }[userRole] || "/login";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    (pathname === "/login" || pathname === "/register") &&
    req.auth?.user
  ) {
    const userRole = (req.auth.user as { role: string }).role;
    const redirectPath = {
      ADMIN: "/admin",
      TRAINER: "/trainer",
      STUDENT: "/student",
      MENTOR: "/mentor",
    }[userRole] || "/student";
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/trainer/:path*",
    "/student/:path*",
    "/mentor/:path*",
    "/login",
    "/register",
  ],
};
