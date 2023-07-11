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

export type CategoryTypeListModel = ReturnType<typeof categoryTypeListModel>;
export function categoryTypeListModel({ data }: ListResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.Name || "",
		createdDate: el.attributes.createdAt,
		updatedDate: el.attributes.updatedAt,
		checked: false,
	}));
}

export type CategoryTypeDetailModel = ReturnType<
	typeof categoryTypeDetailModel
>;
export function categoryTypeDetailModel({ data }: DetailResponse) {
	return {
		name: data.attributes.Name || "",
		createdDate: data.attributes.createdAt,
		updatedDate: data.attributes.updatedAt,
	};
}
