import { GenericObject } from "@/types";

const paginationTypes = ["page", "pageSize"];
export function generateQueryParams(query: GenericObject) {
	const output = [];
	for (const key in query) {
		if (query[key]) {
			if (paginationTypes.includes(key)) {
				output.push(`pagination[${key}]=${query[key]}`);
			} else {
				output.push(`${key}=${query[key]}`);
			}
		}
	}
	if (output.length) return `?${output.join("&")}`;
	return "";
}
