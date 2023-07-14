type TaxesResponse = {
	data: Array<{
		id: number;
		attributes: {
			name: string;
			rate: number;
		};
	}>;
};

type TaxResponse = {
	data: {
		attributes: {
			name: string;
			rate: number;
		};
	};
};

export type TaxListModel = ReturnType<typeof taxListModel>;
export function taxListModel({ data }: TaxesResponse) {
	return data.map((el) => ({
		id: el.id,
		name: el.attributes.name || "",
		rate: el.attributes.rate || 0,
		checked: false,
	}));
}

export type TaxDetailModel = ReturnType<typeof taxDetailModel>;
export function taxDetailModel({ data }: TaxResponse) {
	return {
		name: data.attributes.name || "",
		rate: data.attributes.rate || 0,
	};
}
