export const URLS = {
	JOURNAL_OF_ACCOUNTS: "/journal-of-accounts",
	RESET_PASSWORD: "/reset-password",
	LOGIN: "/login",
	EXPENSES: "/expenses",
	DASHBOARD: "/dashboard",
	INCOMES: "/incomes",
	TRANSACTION_CLINICS: "/transaction-clinics",
	TRANSACTION_MCS: "/transaction-mcs",

	USERS: "/users",
	USERS_CREATE: "/users/form",
	USERS_UPDATE: (id: string | number) => `${URLS.USERS_CREATE}/${id}`,

	ROLES: "/roles",
	ROLES_CREATE: "/roles/form",
	ROLES_UPDATE: (id: string | number) => `${URLS.ROLES_CREATE}/${id}`,

	DEPARTMENTS: "/departments",
	DEPARTMENTS_CREATE: "/departments/form",
	DEPARTMENTS_UPDATE: (id: string | number) =>
		`${URLS.DEPARTMENTS_CREATE}/${id}`,

	CHART_OF_ACCOUNTS: "/chart-of-accounts",
	CHART_OF_ACCOUNTS_CREATE: "/chart-of-accounts/form",
	CHART_OF_ACCOUNTS_UPDATE: (id: string | number) =>
		`${URLS.CHART_OF_ACCOUNTS_CREATE}/${id}`,

	TYPE_ACCOUNTS: "/type-accounts",
	TYPE_ACCOUNTS_CREATE: "/type-accounts/form",
	TYPE_ACCOUNTS_UPDATE: (id: string | number) =>
		`${URLS.TYPE_ACCOUNTS_CREATE}/${id}`,

	BANK_ACCOUNTS: "/bank-accounts",
	BANK_ACCOUNTS_CREATE: "/bank-accounts/form",
	BANK_ACCOUNTS_UPDATE: (id: string | number) =>
		`${URLS.BANK_ACCOUNTS_CREATE}/${id}`,

	BANK_TRANSFERS: "/bank-transfers",
	BANK_TRANSFERS_CREATE: "/bank-transfers/form",
	BANK_TRANSFERS_UPDATE: (id: string | number) =>
		`${URLS.BANK_TRANSFERS_CREATE}/${id}`,

	CATEGORY_ACCOUNTS: "/category-accounts",
	CATEGORY_ACCOUNTS_CREATE: "/category-accounts/form",
	CATEGORY_ACCOUNTS_UPDATE: (id: string | number) =>
		`${URLS.CATEGORY_ACCOUNTS_CREATE}/${id}`,

	CATEGORY_TYPES: "/category-types",
	CATEGORY_TYPES_CREATE: "/category-types/form",
	CATEGORY_TYPES_UPDATE: (id: string | number) =>
		`${URLS.CATEGORY_TYPES_CREATE}/${id}`,

	CATEGORIES: "/categories",
	CATEGORIES_CREATE: "/categories/form",
	CATEGORIES_UPDATE: (id: string | number) => `${URLS.CATEGORIES_CREATE}/${id}`,

	CORPORATES: "/corporates",
	CORPORATES_CREATE: "/corporates/form",
	CORPORATES_UPDATE: (id: string | number) => `${URLS.CORPORATES_CREATE}/${id}`,

	CUSTOMER_GROUPS: "/customer-groups",
	CUSTOMER_GROUPS_CREATE: "/customer-groups/form",
	CUSTOMER_GROUPS_UPDATE: (id: string | number) =>
		`${URLS.CUSTOMER_GROUPS_CREATE}/${id}`,

	PROVIDERS: "/providers",
	PROVIDERS_CREATE: "/providers/form",
	PROVIDERS_UPDATE: (id: string | number) => `${URLS.PROVIDERS_CREATE}/${id}`,

	TAXES: "/taxes",
	TAX_CREATE: "/taxes/form",
	TAX_UPDATE: (id: string | number) => `${URLS.TAX_CREATE}/${id}`,

	PERMISSIONS: "/permissions",
	PERMISSIONS_CREATE: "/permissions/form",
	PERMISSION_UPDATE: (id: string | number) =>
		`${URLS.PERMISSIONS_CREATE}/${id}`,

	VENDORS: "/vendors",
	VENDORS_CREATE: "/vendors/form",
	VENDORS_UPDATE: (id: string | number) => `${URLS.VENDORS_CREATE}/${id}`,
};
