type TaxesResponse = {
	data: Array<{
		id: number;
		attributes: {
			Name: string;
			Rate: number;
			createdAt: string;
			updatedAt: string;
		};
	}>;
};

type TaxResponse = {
	data: {
		attributes: {
			Name: string;
			Rate: number;
			createdAt: string;
			updatedAt: string;
		};
	};
};

export type TaxListModel = ReturnType<typeof taxListModel>;
export function taxListModel({ data }: TaxesResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.Name || "",
		rate: el.attributes.Rate || 0,
		createdDate: el.attributes.createdAt,
		updatedDate: el.attributes.updatedAt,
		checked: false,
	}));
}

export type TaxDetailModel = ReturnType<typeof taxDetailModel>;
export function taxDetailModel({ data }: TaxResponse) {
	return {
		name: data.attributes.Name || "",
		rate: data.attributes.Rate || 0,
		createdDate: data.attributes.createdAt,
		updatedDate: data.attributes.updatedAt,
	};
}
