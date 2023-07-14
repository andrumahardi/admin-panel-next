import {
	bankAccountsMiddleware,
	bankAccountsPathnameMatcher,
	bankTransfersMiddleware,
	bankTransfersPathnameMatcher,
	categoriesMiddleware,
	categoriesPathnameMatcher,
	categoryAccountsMiddleware,
	categoryAccountsPathnameMatcher,
	categoryTypesMiddleware,
	categoryTypesPathnameMatcher,
	chartOfAccountsMiddleware,
	chartOfAccountsPathnameMatcher,
	corporatesMiddleware,
	corporatesPathnameMatcher,
	customerGroupsMiddleware,
	customerGroupsPathnameMatcher,
	dashboardMiddleware,
	dashboardPathnameMatcher,
	homeMiddleware,
	homePathnameMatcher,
	loginMiddleware,
	loginPathnameMatcher,
	providersMiddleware,
	providersPathnameMatcher,
	taxesMiddleware,
	taxesPathnameMatcher,
	typeAccountsMiddleware,
	typeAccountsPathnameMatcher,
	usersMiddleware,
	usersPathnameMatcher,
	vendorsMiddleware,
	vendorsPathnameMatcher,
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
	if (taxesPathnameMatcher(pathname)) {
		return taxesMiddleware(req);
	}
	if (bankAccountsPathnameMatcher(pathname)) {
		return bankAccountsMiddleware(req);
	}
	if (bankTransfersPathnameMatcher(pathname)) {
		return bankTransfersMiddleware(req);
	}
	if (categoriesPathnameMatcher(pathname)) {
		return categoriesMiddleware(req);
	}
	if (categoryAccountsPathnameMatcher(pathname)) {
		return categoryAccountsMiddleware(req);
	}
	if (categoryTypesPathnameMatcher(pathname)) {
		return categoryTypesMiddleware(req);
	}
	if (chartOfAccountsPathnameMatcher(pathname)) {
		return chartOfAccountsMiddleware(req);
	}
	if (corporatesPathnameMatcher(pathname)) {
		return corporatesMiddleware(req);
	}
	if (customerGroupsPathnameMatcher(pathname)) {
		return customerGroupsMiddleware(req);
	}
	if (providersPathnameMatcher(pathname)) {
		return providersMiddleware(req);
	}
	if (typeAccountsPathnameMatcher(pathname)) {
		return typeAccountsMiddleware(req);
	}
	if (vendorsPathnameMatcher(pathname)) {
		return vendorsMiddleware(req);
	}
}

export const config = {
	matcher: [
		"/",
		"/dashboard",
		"/login",
		"/bank-accounts/:path*",
		"/bank-transfers/:path*",
		"/categories/:path*",
		"/category-accounts/:path*",
		"/category-types/:path*",
		"/chart-of-accounts/:path*",
		"/corporates/:path*",
		"/customer-groups/:path*",
		"/providers/:path*",
		"/taxes/:path*",
		"/type-accounts/:path*",
		"/vendors/:path*",
	],
};
