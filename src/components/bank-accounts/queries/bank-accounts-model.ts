type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			holder_name: string;
			bank_name: string;
			account_number: string;
			opening_balance: string;
			contact_number: string;
			bank_address: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			holder_name: string;
			bank_name: string;
			account_number: string;
			opening_balance: string;
			contact_number: string;
			bank_address: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		holderName: attributes.holder_name || "-",
		bankName: attributes.bank_name || "-",
		accountNumber: attributes.account_number || "-",
		openingBalance: attributes.opening_balance || "-",
		contactNumber: attributes.contact_number || "-",
		bankAddress: attributes.bank_address || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		holderName: attributes.holder_name || "-",
		bankName: attributes.bank_name || "-",
		accountNumber: attributes.account_number || "-",
		openingBalance: attributes.opening_balance || "-",
		contactNumber: attributes.contact_number || "-",
		bankAddress: attributes.bank_address || "-",
	};
}
