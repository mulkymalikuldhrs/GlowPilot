
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Middleware is simpler with Firebase client-side auth.
  // We can add logic here later if we need to protect specific API routes
  // or perform server-side redirects based on custom tokens.
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - auth/ (auth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|auth).*)',
  ],
}
