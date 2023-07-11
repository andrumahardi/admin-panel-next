import { GenericObject } from "@/types";

const paginationTypes = ["page", "pageSize"];
export function generateQueryParams(query: GenericObject) {
	const output = [];
	for (const key in query) {
		if (paginationTypes.includes(key)) {
			output.push(`pagination[${key}]=${query[key]}`);
		} else {
			output.push(`${key}=${query[key]}`);
		}
	}
	return `?${output.join("&")}`;
}
