export const URLS = {
	CHART_OF_ACCOUNTS: "/accounts/charts",
	JOURNAL_OF_ACCOUNTS: "/accounts/journals",
	TYPE_ACCOUNTS: "/accounts/types",
	RESET_PASSWORD: "/auth/reset-password",
	LOGIN: "/auth/login",
	BANK_ACCOUNTS: "/banks/accounts",
	BANK_TRANSFERS: "/banks/transfers",
	CATEGORY_ACCOUNTS: "/categories/accounts",
	CATEGORY_TYPES: "/categories/types",
	CATEGORIES: "/categories",
	CORPORATES: "/corporates",
	CUSTOMER_GROUPS: "/customers/groups",
	EXPENSES: "/expenses",
	DASHBOARD: "/dashboard",
	INCOMES: "/incomes",
	PROVIDERS: "/providers",
	TAXES: "/taxes",
	TRANSACTION_CLINICS: "/transactions/clinics",
	TRANSACTION_MCS: "/transactions/mcs",
	PERMISSIONS: "/users/permissions",
	PERMISSION_VIEW: (id: string | number) => `${URLS.PERMISSIONS}/${id}`,
	PERMISSION_EDIT: (id: string | number) => `${URLS.PERMISSIONS}/${id}/edit`,
	ROLES: "/users/roles",
	USERS: "/users",
	VENDORS: "/vendors",
};
