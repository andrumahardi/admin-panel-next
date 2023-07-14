type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			name: string;
			category_type: {
				id: number;
				attributes: {
					name: string;
				};
			};
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			name: string;
			category_type: {
				id: number;
				attributes: {
					name: string;
				};
			};
		};
	};
};

export type CategoryListModel = ReturnType<typeof categoryListModel>;
export function categoryListModel({ data }: ListResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.name || "-",
		categoryType: (el.attributes.category_type || {}).attributes?.name || "-",
		checked: false,
	}));
}

export type CategoryDetailModel = ReturnType<typeof categoryDetailModel>;
export function categoryDetailModel({ data }: DetailResponse) {
	return {
		name: data.attributes.name || "-",
		categoryType: (data.attributes.category_type || {}).attributes?.name || "-",
	};
}
