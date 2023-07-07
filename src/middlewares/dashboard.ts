import { URLS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function dashboardMiddleware(req: NextRequest) {
	const token = req.cookies.get("token");
	if (!token) {
		return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
	}
	return NextResponse.redirect(new URL("/", req.url));
}

export const dashboardPathnameMatcher = (url: string) => url === URLS.DASHBOARD;
