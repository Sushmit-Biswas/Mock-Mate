import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Create a response to modify
  const response = NextResponse.next();
  
  // Set the path in a cookie (this is more reliable than headers for NextJS)
  response.cookies.set('path', pathname);
  
  return response;
}

// Match all request paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};