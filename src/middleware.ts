import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_SUSPENDED } from "@/config/site";

export function middleware(request: NextRequest) {
  if (!SITE_SUSPENDED) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/suspended") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/suspended";

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"]
};
