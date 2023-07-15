type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			account_id: {
				id: number;
				attributes: {
					name: string;
				};
			};
			type_id: {
				id: number;
				attributes: {
					name: string;
				};
			};
			name: string;
			code: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			account_id: {
				id: number;
				attributes: {
					name: string;
				};
			};
			type_id: {
				id: number;
				attributes: {
					name: string;
				};
			};
			name: string;
			code: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		account: (attributes.account_id || {}).attributes?.name || "-",
		type: (attributes.type_id || {}).attributes?.name || "-",
		name: attributes.name || "-",
		code: attributes.code || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		account: (attributes.account_id || {}).attributes?.name || "",
		type: (attributes.type_id || {}).attributes?.name || "",
		name: attributes.name || "",
		code: attributes.code || "",
	};
}
