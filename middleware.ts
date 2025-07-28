import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 🔒 Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Para Next.js dev
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: https: placehold.co",
      "connect-src 'self' https://*.firebase.googleapis.com https://*.firebaseapp.com",
      "frame-src 'none'",
    ].join('; ')
  );

  // 🚪 Protección de rutas admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // TODO: Implementar verificación de autenticación
    // const token = request.cookies.get('auth-token');
    // if (!token || !verifyToken(token)) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
    
    console.warn('⚠️ ADMIN ROUTE ACCESSED WITHOUT AUTH CHECK:', request.nextUrl.pathname);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 