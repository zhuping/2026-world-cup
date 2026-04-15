import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['zh', 'en', 'ja', 'ko', 'pt', 'es'];
const DEFAULT_LANG = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore API routes, static files, and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/) // e.g. .jpg, .png, .ico
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a supported language prefix
  const pathParts = pathname.split('/').filter(Boolean);
  const firstPart = pathParts[0];

  if (SUPPORTED_LANGS.includes(firstPart)) {
    return NextResponse.next();
  }

  // If no valid language prefix, redirect to the default language (or user preferred)
  // For SEO and simplicity, we just redirect /... to /en/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
