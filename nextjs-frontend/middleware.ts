import { NextRequest, NextResponse } from "next/server";
import { REDIRECT_MAP } from "@/lib/redirect-map";

// 301 redirect map for old .aspx URLs -> new routes.
// Uses an O(1) Map lookup instead of 2,844 sequential pattern tests in next.config.
// Keys are normalized: lowercased + trailing slash stripped (except root).

function normalizePath(pathname: string): string {
  let p = pathname.toLowerCase();
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = REDIRECT_MAP.get(normalizePath(pathname));

  if (target) {
    const url = new URL(target + search, request.url);
    // 308 = permanent (SEO-equity-preserving, the modern equivalent of 301).
    // MUST be a permanent code (301/308), never 307/302, or ranking won't transfer.
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Only run middleware on real page requests.
// Excludes Next internals, static assets, API routes, and common file extensions
// so we don't add latency to every asset fetch.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
