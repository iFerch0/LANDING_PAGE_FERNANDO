import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIMARY_HOST = 'ferchotecnico.com';

export function middleware(req: NextRequest) {
  // Skip in development
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const host = req.headers.get('host') || '';
  const proto = req.headers.get('x-forwarded-proto') || req.nextUrl.protocol || 'https';

  // If host is already primary host and https, nothing to do
  if (host === PRIMARY_HOST && proto === 'https') return NextResponse.next();

  // Redirect to canonical https://ferchotecnico.com
  const url = req.nextUrl.clone();
  url.protocol = 'https';
  url.hostname = PRIMARY_HOST;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: '/:path*',
};
