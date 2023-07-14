type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			amount: string;
			date: string;
			reference: string;
			description: string;
			from_account_id: {
				data: {
					id: number;
					attributes: {
						holder_name: string;
						bank_name: string;
					};
				};
			};
			to_account_id: {
				data: {
					id: number;
					attributes: {
						holder_name: string;
						bank_name: string;
					};
				};
			};
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			amount: string;
			date: string;
			reference: string;
			description: string;
			from_account_id: {
				data: {
					id: number;
					attributes: {
						holder_name: string;
						bank_name: string;
					};
				};
			};
			to_account_id: {
				data: {
					id: number;
					attributes: {
						holder_name: string;
						bank_name: string;
					};
				};
			};
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		amount: attributes.amount || "-",
		date: attributes.date || "-",
		reference: attributes.reference || "-",
		description: attributes.description || "-",
		fromAccount:
			((attributes.from_account_id || {}).data || {}).attributes?.holder_name ||
			"-",
		toAccount:
			((attributes.to_account_id || {}).data || {}).attributes?.holder_name ||
			"-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		amount: attributes.amount || "-",
		date: attributes.date || "-",
		reference: attributes.reference || "-",
		description: attributes.description || "-",
		fromAccount:
			((attributes.from_account_id || {}).data || {}).attributes?.holder_name ||
			"-",
		toAccount:
			((attributes.to_account_id || {}).data || {}).attributes?.holder_name ||
			"-",
	};
}
