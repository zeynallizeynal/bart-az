import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies;
  const accessToken = cookie.get("access_token")?.value;

  if (pathname.includes("/profile") && !accessToken) {
    return NextResponse.error();
  }
  // if (pathname.includes("/listings/new") && !accessToken)
  //   return NextResponse.redirect(new URL("/", request.url));
  // return NextResponse.error();

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
