type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			Name: string;
			createdAt: string;
			updatedAt: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			Name: string;
			createdAt: string;
			updatedAt: string;
		};
	};
};

export type CategoryListModel = ReturnType<typeof categoryListModel>;
export function categoryListModel({ data }: ListResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.Name || "",
		createdDate: el.attributes.createdAt,
		updatedDate: el.attributes.updatedAt,
		checked: false,
	}));
}

export type CategoryDetailModel = ReturnType<typeof categoryDetailModel>;
export function categoryDetailModel({ data }: DetailResponse) {
	return {
		name: data.attributes.Name || "",
		createdDate: data.attributes.createdAt,
		updatedDate: data.attributes.updatedAt,
	};
}
