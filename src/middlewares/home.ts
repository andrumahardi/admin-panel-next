import { URLS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function homeMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
  }
  return NextResponse.rewrite(new URL(URLS.DASHBOARD, req.url));
}

export const homePathnameMatcher = (url: string) => url === "/";
