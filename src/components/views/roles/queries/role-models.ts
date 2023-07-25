type ListResponse = {
	roles: Array<{
		id: number;
		name: string;
		description: string;
		type: string;
		createdAt: string;
		updatedAt: string;
		nb_users: number;
	}>;
};

type DetailResponse = {
	role: {
		id: number;
		name: string;
		description: string;
		type: string;
		createdAt: string;
		updatedAt: string;
		nb_users: number;
	};
};

export type ListModel = ReturnType<typeof listModel>;
export function listModel({ roles }: ListResponse) {
	return roles.map((el) => ({
		id: el.id,
		name: el.name || "-",
		description: el.description || "-",
		type: el.type || "-",
		checked: false,
	}));
}

export type DetailModel = ReturnType<typeof detailModel>;
export function detailModel({ role }: DetailResponse) {
	return {
		name: role.name || "",
		description: role.description || "",
		type: role.type || "",
	};
}
