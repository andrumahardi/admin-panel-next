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
import { URLS } from "./constants";

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
		URLS.LOGIN,
		`${URLS.BANK_ACCOUNTS}/:path*`,
		`${URLS.BANK_TRANSFERS}/:path*`,
		`${URLS.CATEGORIES}/:path*`,
		`${URLS.CATEGORY_ACCOUNTS}/:path*`,
		`${URLS.CATEGORY_TYPES}/:path*`,
		`${URLS.CHART_OF_ACCOUNTS}/:path*`,
		`${URLS.CORPORATES}/:path*`,
		`${URLS.CUSTOMER_GROUPS}/:path*`,
		`${URLS.PROVIDERS}/:path*`,
		`${URLS.TAXES}/:path*`,
		`${URLS.TYPE_ACCOUNTS}/:path*`,
		`${URLS.VENDORS}/:path*`,
	],
};
