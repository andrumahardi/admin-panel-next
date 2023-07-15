type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
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
		name: attributes.name || "-",
		email: attributes.email || "-",
		bankCode: attributes.bank_code || "-",
		bankName: attributes.bank_name || "-",
		accountNumber: attributes.account_number || "-",
		accountName: attributes.account_name || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		name: attributes.name || "",
		email: attributes.email || "",
		bankCode: attributes.bank_code || "",
		bankName: attributes.bank_name || "",
		accountNumber: attributes.account_number || "",
		accountName: attributes.account_name || "",
	};
}
