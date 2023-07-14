import { URLS } from "./urls";

export const sidemenu = [
	{
		name: "Dashboard",
		link: "/",
	},
	{
		name: "User Management",
		children: [
			{
				name: "Permissions",
				link: URLS.PERMISSIONS,
			},
			{
				name: "Roles",
				link: URLS.ROLES,
			},
			{
				name: "Users",
				link: URLS.USERS,
			},
		],
	},
	{
		name: "Accounting Setup",
		children: [
			{
				name: "Tax",
				link: URLS.TAXES,
			},
			{
				name: "Category Type",
				link: URLS.CATEGORY_TYPES,
			},
			{
				name: "Category",
				link: URLS.CATEGORIES,
			},
			{
				name: "Bank Account",
				link: URLS.BANK_ACCOUNTS,
			},
			{
				name: "Bank Transfer",
				link: URLS.BANK_TRANSFERS,
			},
			{
				name: "Department",
				link: URLS.DEPARTMENTS,
			},
			{
				name: "Customer Group",
				link: URLS.CUSTOMER_GROUPS,
			},
			{
				name: "Corporate",
				link: URLS.CORPORATES,
			},
			{
				name: "Provider",
				link: URLS.PROVIDERS,
			},
			{
				name: "Vendor",
				link: URLS.VENDORS,
			},
			{
				name: "Category Account",
				link: URLS.CATEGORY_ACCOUNTS,
			},
			{
				name: "Type Account",
				link: URLS.TYPE_ACCOUNTS,
			},
			{
				name: "Chart of Account",
				link: URLS.CHART_OF_ACCOUNTS,
			},
		],
	},
	{
		name: "Transaction Clinic",
		link: URLS.TRANSACTION_CLINICS,
	},
	{
		name: "Transaction MC",
		link: URLS.TRANSACTION_MCS,
	},
	{
		name: "Income",
		link: URLS.INCOMES,
	},
	{
		name: "Expense",
		link: URLS.EXPENSES,
	},
	{
		name: "Journal Account",
		link: URLS.JOURNAL_OF_ACCOUNTS,
	},
	{
		name: "Change Password",
		link: URLS.RESET_PASSWORD,
	},
];
