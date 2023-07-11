export const URLS = {
	CHART_OF_ACCOUNTS: "/coa",
	JOURNAL_OF_ACCOUNTS: "/journal-of-accounts",
	TYPE_ACCOUNTS: "/account-types",
	RESET_PASSWORD: "/reset-password",
	LOGIN: "/login",
	BANK_ACCOUNTS: "/bank-accounts",
	BANK_TRANSFERS: "/bank-transfers",
	CATEGORY_ACCOUNTS: "/category-accounts",

	CATEGORY_TYPES: "/category-types",
	CATEGORY_TYPES_CREATE: "/category-types/form",
	CATEGORY_TYPES_UPDATE: (id: string | number) =>
		`${URLS.CATEGORY_TYPES_CREATE}/${id}`,

	CATEGORIES: "/categories",
	CATEGORIES_CREATE: "/categories/form",
	CATEGORIES_UPDATE: (id: string | number) => `${URLS.CATEGORIES_CREATE}/${id}`,

	CORPORATES: "/corporates",
	CUSTOMER_GROUPS: "/customer-groups",
	EXPENSES: "/expenses",
	DASHBOARD: "/dashboard",
	INCOMES: "/incomes",
	PROVIDERS: "/providers",

	TAXES: "/taxes",
	TAX_CREATE: "/taxes/form",
	TAX_UPDATE: (id: string | number) => `${URLS.TAX_CREATE}/${id}`,

	TRANSACTION_CLINICS: "/transaction-clinics",
	TRANSACTION_MCS: "/transaction-mcs",

	PERMISSIONS: "/permissions",
	PERMISSIONS_CREATE: "/permissions/form",
	PERMISSION_UPDATE: (id: string | number) =>
		`${URLS.PERMISSIONS_CREATE}/${id}`,

	ROLES: "/roles",
	USERS: "/users",
	VENDORS: "/vendors",
};
