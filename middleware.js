import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const userData=request.cookies.get('User');
 
  let role;
  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData?.value); // Parse the JSON string
      role = parsedUserData?.role; // Access the role
    } catch (error) {
      console.error('Failed to parse User cookie:', error);
    }
  }

  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/ManageAdmins',
    '/dashboard/ManageBranches',
    '/dashboard/YourBookings',
    '/dashboard/Payments',
    '/dashboard/Expenses',
    '/dashboard/Messages'
  ];

  const generalProtectedRoutes = ['/booknow', '/checkout', '/bookings'];

  // Restrict access to dashboard routes for non-admin users
  if (dashboardRoutes.includes(request.nextUrl.pathname)) {
    if (!token || (role !== 'superadmin' && role !== 'admin')) {
      const url = new URL('/Notadmin', request.url); // Redirect to Unauthorized page
      return NextResponse.rewrite(url);
    }
  }

  // Restrict access to general protected routes for unauthenticated users
  if (generalProtectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      const url = new URL('/unauthorized', request.url); // Redirect to Unauthorized page
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}


// Specify the routes where the middleware should run
export const config = {
  matcher: ['/booknow', '/dashboard','/checkout','/bookings','/dashboard/ManageAdmins','/dashboard/ManageBranches','/dashboard/YourBookings','/dashboard/Payments','/dashboard/Expenses','/dashboard/Messages'], // Apply to protected routes
};
