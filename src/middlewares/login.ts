import { URLS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function loginMiddleware(req: NextRequest) {
	const token = req.cookies.get("token");
	if (token) {
		return NextResponse.redirect(new URL(URLS.DASHBOARD, req.url));
	}
	return NextResponse.next();
}

export const loginPathnameMatcher = (url: string) => url === URLS.LOGIN;
