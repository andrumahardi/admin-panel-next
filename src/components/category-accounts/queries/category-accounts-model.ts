type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			name: string;
			published_at: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			name: string;
			published_at: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		name: attributes.name || "",
		publishedDate: attributes.published_at || "",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		name: attributes.name || "",
		publishedDate: attributes.published_at || "",
	};
}
