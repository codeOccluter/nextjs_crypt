// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ko', 'en'];
const defaultLocale = 'ko';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('🌐 middleware pathname:', pathname);

  // ✅ 이미 locale이 붙어 있는 경우는 그대로 통과
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ locale이 붙어 있으면 pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|_static|favicon.ico|api|.*\\..*).*)',
  ],
};
