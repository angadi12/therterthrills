import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const userData = request.cookies.get("User");
  let role;
  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData?.value);
      role = parsedUserData?.role;
    } catch (error) {
      console.error("Failed to parse User cookie:", error);
    }
  }

  const dashboardRoutes = [
    "/dashboard",
    "/dashboard/ManageAdmins",
    "/dashboard/ManageBranches",
    "/dashboard/ManageTheatres",
    "/dashboard/YourBookings",
    "/dashboard/Payments",
    "/dashboard/Expenses",
    "/dashboard/Messages",
  ];

  const generalProtectedRoutes = ["/booknow", "/checkout", "/bookings"];

  if (dashboardRoutes.includes(request.nextUrl.pathname)) {
    if (!token || (role !== "superadmin" && role !== "admin")) {
      const url = new URL("/Notadmin", request.url);
      return NextResponse.rewrite(url);
    }
  }

  if (generalProtectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      const url = new URL("/unauthorized", request.url);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/booknow",
    "/dashboard",
    "/checkout",
    "/bookings",
    "/dashboard/ManageAdmins",
    "/dashboard/ManageBranches",
    "/dashboard/YourBookings",
    "/dashboard/Payments",
    "/dashboard/Expenses",
    "/dashboard/Messages",
    "/dashboard/ManageTheatres",
  ],
};
