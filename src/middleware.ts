
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for route protection.
 * 
 * Since GlowPilot uses Firebase Auth (client-side), we perform a lightweight
 * check for the Firebase auth cookie/token on protected routes. For full
 * server-side auth verification, the Firebase Admin SDK should be used.
 * 
 * Protected routes: /chat, /catalog, /onboarding, /history, /progress, /profile
 * Public routes: /, /login, /api, /_next
 */
const protectedPaths = ['/chat', '/catalog', '/onboarding', '/history', '/progress', '/profile'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtected) {
        // Check for Firebase auth session cookie or custom token
        // Firebase Auth stores the session in localStorage on the client,
        // but we can check for a custom cookie set during login.
        // For now, we check for the presence of any auth cookie as a basic guard.
        // Full implementation would use Firebase Admin SDK to verify the ID token.
        const hasAuthCookie = request.cookies.has('__session') || 
                             request.cookies.has('firebase-auth-token');

        if (!hasAuthCookie) {
            // Redirect to login page if no auth cookie is found
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

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
         * - login (login route)
         * - scroll-video (public demo)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|login|scroll-video).*)',
    ],
}
