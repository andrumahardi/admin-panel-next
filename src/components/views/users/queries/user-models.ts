type ListResponse = Array<{
	id: number;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
}>;

type DetailResponse = {
	id: number;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
};

export type ListModel = ReturnType<typeof listModel>;
export function listModel(data: ListResponse) {
	return data.map((el) => ({
		id: el.id,
		username: el.username || "-",
		email: el.email || "-",
		checked: false,
	}));
}

export type DetailModel = ReturnType<typeof detailModel>;
export function detailModel(data: DetailResponse) {
	return {
		username: data.username || "",
		email: data.email || "",
	};
}
