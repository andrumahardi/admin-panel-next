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

export type CategoryTypeListModel = ReturnType<typeof categoryTypeListModel>;
export function categoryTypeListModel({ data }: ListResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.name || "-",
		checked: false,
	}));
}

export type CategoryTypeDetailModel = ReturnType<
	typeof categoryTypeDetailModel
>;
export function categoryTypeDetailModel({ data }: DetailResponse) {
	return {
		name: data.attributes.name || "",
	};
}
