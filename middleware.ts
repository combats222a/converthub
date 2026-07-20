import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * До миграции все страницы (кроме главной) жили под префиксом /ru/... —
 * новая архитектура от него отказалась (см. lib/site-config.ts). Чтобы не
 * потерять накопленный SEO-вес и внешние ссылки на старые адреса, здесь
 * стоит постоянный (301) редирект со старых /ru/* на новые пути без
 * префикса.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/ru" || pathname === "/ru/") {
    return NextResponse.redirect(new URL(`/${search}`, request.url), 301);
  }

  if (pathname.startsWith("/ru/")) {
    const rest = pathname.slice(4).replace(/\/$/, "");
    return NextResponse.redirect(new URL(`/${rest}${search}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ru", "/ru/:path*"],
};
