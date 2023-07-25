import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./providers-model";

export type ProvidersQuery = {
	page: number;
	pageSize: number;
};

export type CreateProviderVariables = {
	data: {
		code: string;
		name: string;
		email: string;
		bank_code: string;
		bank_name: string;
		account_number: string;
		account_name: string;
	};
};

export type UpdateProviderVariables = Pick<CreateProviderVariables, "data"> & {
	id: string;
};

export type DeleteProviderVariables = Pick<UpdateProviderVariables, "id">;

export const providerKeys = {
	all: ["PROVIDERS"],
	list: (query: ProvidersQuery) => [
		...providerKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...providerKeys.all, "EXPORT_LIST"],
	detail: () => [...providerKeys.all, "DETAIL"],
};

export async function getProviders(
	query: ProvidersQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/providers${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetProvidersCache = Awaited<ReturnType<typeof getProviders>>;

export function useGetProviders(query: ProvidersQuery) {
	return useQuery<GetProvidersCache, AxiosError<FetchError>, GetProvidersCache>(
		providerKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getProviders(query, fetch);
		}
	);
}

export async function createProvider(variables: CreateProviderVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/providers", { ...variables });

	return {
		message: "success",
	};
}

type CreateProviderResponse = Awaited<ReturnType<typeof createProvider>>;

export function useCreateProvider() {
	return useMutation<
		CreateProviderResponse,
		AxiosError<FetchError>,
		CreateProviderVariables
	>(createProvider);
}

export async function getDetailProvider(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/providers/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetDetailProviderCache = Awaited<ReturnType<typeof getDetailProvider>>;

export function useGetProviderDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetDetailProviderCache,
		AxiosError<FetchError>,
		GetDetailProviderCache
	>;
}) {
	return useQuery<
		GetDetailProviderCache,
		AxiosError<FetchError>,
		GetDetailProviderCache
	>(
		providerKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailProvider(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateProvider({ id, data }: UpdateProviderVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/providers/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateProviderResponse = Awaited<ReturnType<typeof updateProvider>>;

export function useUpdateProvider() {
	return useMutation<
		UpdateProviderResponse,
		AxiosError<FetchError>,
		UpdateProviderVariables
	>(updateProvider);
}

export async function deleteProvider({ id }: DeleteProviderVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/providers/${id}`);
	return {
		message: "success",
	};
}

type DeleteProviderResponse = Awaited<ReturnType<typeof deleteProvider>>;

export function useDeleteProvider() {
	return useMutation<
		DeleteProviderResponse,
		AxiosError<FetchError>,
		DeleteProviderVariables
	>(deleteProvider);
}

export async function exportProviders(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/provider/export?type=csv"),
		fetch.get("/provider/export?type=excel", { responseType: "blob" }),
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

type ExportProvidersCache = Awaited<ReturnType<typeof exportProviders>>;

export function useExportProviders() {
	return useQuery<
		ExportProvidersCache,
		AxiosError<FetchError>,
		ExportProvidersCache
	>(providerKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportProviders(fetch);
	});
}
