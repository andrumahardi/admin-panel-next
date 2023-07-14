type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			code: string;
			name: string;
			client_code: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			code: string;
			name: string;
			client_code: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		code: attributes.code || "-",
		name: attributes.name || "-",
		clientCode: attributes.client_code || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		code: attributes.code || "-",
		name: attributes.name || "-",
		clientCode: attributes.client_code || "-",
	};
}
