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
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.name || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	return {
		name: data.attributes.name || "-",
	};
}
