import { URLS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";

export function customerGroupsMiddleware(req: NextRequest) {
	const token = req.cookies.get("token");
	if (!token) {
		return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
	}
	return NextResponse.next();
}

const matcher = match(`${URLS.CUSTOMER_GROUPS}/:path*`, {
	decode: decodeURIComponent,
});

export const customerGroupsPathnameMatcher = (url: string) => matcher(url);
