type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			code: string;
			name: string;
			email: string;
			bank_code: string;
			bank_name: string;
			account_number: string;
			account_name: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			code: string;
			name: string;
			email: string;
			bank_code: string;
			bank_name: string;
			account_number: string;
			account_name: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		code: attributes.code || "-",
		name: attributes.name || "-",
		email: attributes.email || "-",
		bankCode: attributes.bank_code || "-",
		bankName: attributes.bank_name || "-",
		accountName: attributes.account_name || "-",
		accountNumber: attributes.account_number || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		code: attributes.code || "",
		name: attributes.name || "",
		email: attributes.email || "",
		bankCode: attributes.bank_code || "",
		bankName: attributes.bank_name || "",
		accountName: attributes.account_name || "",
		accountNumber: attributes.account_number || "",
	};
}
