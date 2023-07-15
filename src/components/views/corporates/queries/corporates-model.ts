type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			customer_group: {
				data: {
					id: number;
					attributes: {
						code: string;
						name: string;
					};
				};
			};
			email: string;
			bank_code: string;
			bank_name: string;
			code: string;
			name: string;
			account_number: string;
			account_name: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			customer_group: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			email: string;
			bank_code: string;
			bank_name: string;
			code: string;
			name: string;
			account_number: string;
			account_name: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		customerGroup:
			((attributes.customer_group || {}).data || {}).attributes?.name || "-",
		code: attributes.code || "-",
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
		customerGroup:
			((attributes.customer_group || {}).data || {}).attributes?.name || "",
		code: attributes.code || "",
		name: attributes.name || "",
		email: attributes.email || "",
		bankCode: attributes.bank_code || "",
		bankName: attributes.bank_name || "",
		accountNumber: attributes.account_number || "",
		accountName: attributes.account_name || "",
	};
}
