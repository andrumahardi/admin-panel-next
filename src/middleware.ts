import {
	dashboardMiddleware,
	dashboardPathnameMatcher,
	homeMiddleware,
	homePathnameMatcher,
	loginMiddleware,
	loginPathnameMatcher,
	usersMiddleware,
	usersPathnameMatcher,
} from "@/middlewares";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (dashboardPathnameMatcher(pathname)) {
		return dashboardMiddleware(req);
	}

	if (homePathnameMatcher(pathname)) {
		return homeMiddleware(req);
	}

	if (usersPathnameMatcher(pathname)) {
		return usersMiddleware(req);
	}

	if (loginPathnameMatcher(pathname)) {
		return loginMiddleware(req);
	}
}

export const config = {
	matcher: ["/", "/dashboard", "/users/:path*", "/auth/login"],
};
