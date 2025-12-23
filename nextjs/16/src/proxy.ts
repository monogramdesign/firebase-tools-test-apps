import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/authenticated") {
    if (request.nextUrl.searchParams.get("admin") !== null) {
      return NextResponse.next();
    }

    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/authenticated"],
};
