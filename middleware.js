import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(request) {
  const token = request.cookies.get('token');

  // Define protected routes
  const protectedRoutes = ['/booknow', '/dashboard','/checkout','/bookings'];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      const url = new URL('/unauthorized', request.url); // Redirect to Unauthorized
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Specify the routes where the middleware should run
export const config = {
  matcher: ['/booknow', '/dashboard','/checkout','/bookings'], // Apply to protected routes
};
