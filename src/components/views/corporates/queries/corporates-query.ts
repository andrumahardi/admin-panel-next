import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./corporates-model";

export type CorporatesQuery = {
	page: number;
	pageSize: number;
	populate?: string | string[];
};

export type CreateCorporateVariables = {
	data: {
		code: string;
		name: string;
		email: string;
		bank_code: string;
		bank_name: string;
		account_number: string;
		account_name: string;
		customer_group: number;
	};
};

export type UpdateCorporateVariables = Pick<
	CreateCorporateVariables,
	"data"
> & {
	id: string;
};

export type DeleteCorporateVariables = Pick<UpdateCorporateVariables, "id">;

export const corporateKeys = {
	all: ["CORPORATES"],
	list: (query: CorporatesQuery) => [
		...corporateKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...corporateKeys.all, "EXPORT_LIST"],
	detail: () => [...corporateKeys.all, "DETAIL"],
};

export async function getCorporates(
	query: CorporatesQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/corporates${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetCorporatesCache = Awaited<ReturnType<typeof getCorporates>>;

export function useGetCorporates(query: CorporatesQuery) {
	return useQuery<
		GetCorporatesCache,
		AxiosError<FetchError>,
		GetCorporatesCache
	>(corporateKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getCorporates(query, fetch);
	});
}

export async function createCorporate(variables: CreateCorporateVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/corporates", { ...variables });

	return {
		message: "success",
	};
}

type CreateCorporateResponse = Awaited<ReturnType<typeof createCorporate>>;

export function useCreateCorporate() {
	return useMutation<
		CreateCorporateResponse,
		AxiosError<FetchError>,
		CreateCorporateVariables
	>(createCorporate);
}

export async function getDetailCorporate(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/corporates/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetCorporateDetailCache = Awaited<ReturnType<typeof getDetailCorporate>>;

export function useGetCorporateDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetCorporateDetailCache,
		AxiosError<FetchError>,
		GetCorporateDetailCache
	>;
}) {
	return useQuery<
		GetCorporateDetailCache,
		AxiosError<FetchError>,
		GetCorporateDetailCache
	>(
		corporateKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailCorporate(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateCorporate({ id, data }: UpdateCorporateVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/corporates/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateCorporateResponse = Awaited<ReturnType<typeof updateCorporate>>;

export function useUpdateCorporate() {
	return useMutation<
		UpdateCorporateResponse,
		AxiosError<FetchError>,
		UpdateCorporateVariables
	>(updateCorporate);
}

export async function deleteCorporate({ id }: DeleteCorporateVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/corporates/${id}`);
	return {
		message: "success",
	};
}

type DeleteCorporateResponse = Awaited<ReturnType<typeof deleteCorporate>>;

export function useDeleteCorporate() {
	return useMutation<
		DeleteCorporateResponse,
		AxiosError<FetchError>,
		DeleteCorporateVariables
	>(deleteCorporate);
}

export async function exportCorporates(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/corporate/export?type=csv"),
		fetch.get("/corporate/export?type=excel", { responseType: "blob" }),
	]);
	return {
		data: {
			csv: URL.createObjectURL(
				new Blob([csv.data], { type: "text/csv;charset=utf-8" })
			),
			excel: URL.createObjectURL(excel.data),
		},
	};
}

type ExportCorporatesCache = Awaited<ReturnType<typeof exportCorporates>>;

export function useExportCorporates() {
	return useQuery<
		ExportCorporatesCache,
		AxiosError<FetchError>,
		ExportCorporatesCache
	>(corporateKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportCorporates(fetch);
	});
}
