import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./type-accounts-model";

export type TypeAccountsQuery = {
	page: number;
	pageSize: number;
};

export type CreateTypeAccountVariables = {
	data: {
		name: string;
	};
};

export type UpdateTypeAccountVariables = Pick<
	CreateTypeAccountVariables,
	"data"
> & {
	id: string;
};

export type DeleteTypeAccountVariables = Pick<UpdateTypeAccountVariables, "id">;

export const typeAccountKeys = {
	all: ["TYPE_ACCOUNTS"],
	list: (query: TypeAccountsQuery) => [
		...typeAccountKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...typeAccountKeys.all, "EXPORT_LIST"],
	detail: () => [...typeAccountKeys.all, "DETAIL"],
};

export async function getTypeAccounts(
	query: TypeAccountsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/type-accounts${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetTypeAccountsCache = Awaited<ReturnType<typeof getTypeAccounts>>;

export function useGetTypeAccounts(query: TypeAccountsQuery) {
	return useQuery<
		GetTypeAccountsCache,
		AxiosError<FetchError>,
		GetTypeAccountsCache
	>(typeAccountKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getTypeAccounts(query, fetch);
	});
}

export async function createTypeAccount(variables: CreateTypeAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/type-accounts", { ...variables });

	return {
		message: "success",
	};
}

type CreateTypeAccountResponse = Awaited<ReturnType<typeof createTypeAccount>>;

export function useCreateTypeAccount() {
	return useMutation<
		CreateTypeAccountResponse,
		AxiosError<FetchError>,
		CreateTypeAccountVariables
	>(createTypeAccount);
}

export async function getDetailTypeAccount(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/type-accounts/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetTypeAccountDetailCache = Awaited<
	ReturnType<typeof getDetailTypeAccount>
>;

export function useGetTypeAccountDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetTypeAccountDetailCache,
		AxiosError<FetchError>,
		GetTypeAccountDetailCache
	>;
}) {
	return useQuery<
		GetTypeAccountDetailCache,
		AxiosError<FetchError>,
		GetTypeAccountDetailCache
	>(
		typeAccountKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailTypeAccount(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateTypeAccount({
	id,
	data,
}: UpdateTypeAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/type-accounts/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateTypeAccountResponse = Awaited<ReturnType<typeof updateTypeAccount>>;

export function useUpdateTypeAccount() {
	return useMutation<
		UpdateTypeAccountResponse,
		AxiosError<FetchError>,
		UpdateTypeAccountVariables
	>(updateTypeAccount);
}

export async function deleteTypeAccount({ id }: DeleteTypeAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/type-accounts/${id}`);
	return {
		message: "success",
	};
}

type DeleteTypeAccountResponse = Awaited<ReturnType<typeof deleteTypeAccount>>;

export function useDeleteTypeAccount() {
	return useMutation<
		DeleteTypeAccountResponse,
		AxiosError<FetchError>,
		DeleteTypeAccountVariables
	>(deleteTypeAccount);
}

export async function exportTypeAccounts(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/type-account/export?type=csv"),
		fetch.get("/type-account/export?type=excel", { responseType: "blob" }),
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

type ExportTypeAccountsCache = Awaited<ReturnType<typeof exportTypeAccounts>>;

export function useExportTypeAccounts() {
	return useQuery<
		ExportTypeAccountsCache,
		AxiosError<FetchError>,
		ExportTypeAccountsCache
	>(typeAccountKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportTypeAccounts(fetch);
	});
}
