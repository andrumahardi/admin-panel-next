import { URLS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";

export function usersMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
  }
  return NextResponse.next();
}

const matcher = match("/users/:path*", { decode: decodeURIComponent });

export const usersPathnameMatcher = (url: string) => matcher(url);
