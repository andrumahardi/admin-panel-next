type ListResponse = {
	data: Array<{
		id: number;
		attributes: {
			category_account: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			type_account: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			name: string;
			code: string;
		};
	}>;
};

type DetailResponse = {
	data: {
		attributes: {
			category_account: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			type_account: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			name: string;
			code: string;
		};
	};
};

export function listModel({ data }: ListResponse) {
	return data.map(({ attributes, id }) => ({
		id: id,
		categoryAccount:
			(attributes.category_account?.data || {}).attributes?.name || "-",
		typeAccount: (attributes.type_account?.data || {}).attributes?.name || "-",
		name: attributes.name || "-",
		code: attributes.code || "-",
		checked: false,
	}));
}

export function detailModel({ data }: DetailResponse) {
	const { attributes } = data;
	return {
		categoryAccount: (attributes.category_account?.data || {}).id || "",
		typeAccount: (attributes.type_account?.data || {}).id || "",
		name: attributes.name || "",
		code: attributes.code || "",
	};
}
