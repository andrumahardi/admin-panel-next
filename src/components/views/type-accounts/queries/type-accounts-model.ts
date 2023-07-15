type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			name: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			name: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		name: attributes.name || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		name: attributes.name || "",
	};
}
