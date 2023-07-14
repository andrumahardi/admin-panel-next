type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			account: string;
			type: string;
			name: string;
			code: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			account: string;
			type: string;
			name: string;
			code: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		account: attributes.account || "-",
		type: attributes.type || "-",
		name: attributes.name || "-",
		code: attributes.code || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		account: attributes.account || "-",
		type: attributes.type || "-",
		name: attributes.name || "-",
		code: attributes.code || "-",
	};
}
