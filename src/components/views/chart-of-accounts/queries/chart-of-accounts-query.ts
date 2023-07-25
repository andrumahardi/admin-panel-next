import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./chart-of-accounts-model";

export type ChartOfAccountsQuery = {
	page: number;
	pageSize: number;
	populate?: string | string[];
};

export type ChartOfAccountVariables = {
	data: {
		name: string;
		code: string;
		category_account: string;
		type_account: string;
	};
};

export type UpdateChartOfAccountVariables = Pick<
	ChartOfAccountVariables,
	"data"
> & {
	id: string;
};

export type DeleteChartOfAccountVariables = Pick<
	UpdateChartOfAccountVariables,
	"id"
>;

export const chartOfAccountKeys = {
	all: ["CHART_OF_ACCOUNTS"],
	list: (query: ChartOfAccountsQuery) => [
		...chartOfAccountKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...chartOfAccountKeys.all, "EXPORT_LIST"],
	detail: () => [...chartOfAccountKeys.all, "DETAIL"],
};

export async function getChartOfAccounts(
	query: ChartOfAccountsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(
		`/chart-of-accounts${generateQueryParams(query)}`
	);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type ChartOfAccountsCache = Awaited<ReturnType<typeof getChartOfAccounts>>;

export function useGetChartOfAccounts(query: ChartOfAccountsQuery) {
	return useQuery<
		ChartOfAccountsCache,
		AxiosError<FetchError>,
		ChartOfAccountsCache
	>(chartOfAccountKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getChartOfAccounts(query, fetch);
	});
}

export async function createChartOfAccount(variables: ChartOfAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/chart-of-accounts", { ...variables });

	return {
		message: "success",
	};
}

type CreateChartOfAccountResponse = Awaited<
	ReturnType<typeof createChartOfAccount>
>;

export function useCreateChartOfAccount() {
	return useMutation<
		CreateChartOfAccountResponse,
		AxiosError<FetchError>,
		ChartOfAccountVariables
	>(createChartOfAccount);
}

export async function getDetailChartOfAccount(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/chart-of-accounts/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetChartOfAccountDetailCache = Awaited<
	ReturnType<typeof getDetailChartOfAccount>
>;

export function useGetChartOfAccountDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetChartOfAccountDetailCache,
		AxiosError<FetchError>,
		GetChartOfAccountDetailCache
	>;
}) {
	return useQuery<
		GetChartOfAccountDetailCache,
		AxiosError<FetchError>,
		GetChartOfAccountDetailCache
	>(
		chartOfAccountKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailChartOfAccount(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateChartOfAccount({
	id,
	data,
}: UpdateChartOfAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/chart-of-accounts/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateChartOfAccountResponse = Awaited<
	ReturnType<typeof updateChartOfAccount>
>;

export function useUpdateChartOfAccount() {
	return useMutation<
		UpdateChartOfAccountResponse,
		AxiosError<FetchError>,
		UpdateChartOfAccountVariables
	>(updateChartOfAccount);
}

export async function deleteChartOfAccount({
	id,
}: DeleteChartOfAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/chart-of-accounts/${id}`);
	return {
		message: "success",
	};
}

type DeleteChartOfAccountResponse = Awaited<
	ReturnType<typeof deleteChartOfAccount>
>;

export function useDeleteChartOfAccount() {
	return useMutation<
		DeleteChartOfAccountResponse,
		AxiosError<FetchError>,
		DeleteChartOfAccountVariables
	>(deleteChartOfAccount);
}

export async function exportChartOfAccounts(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/chart-of-account/export?type=csv"),
		fetch.get("/chart-of-account/export?type=excel", { responseType: "blob" }),
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

type ExportChartOfAccountsCache = Awaited<
	ReturnType<typeof exportChartOfAccounts>
>;

export function useExportChartOfAccounts() {
	return useQuery<
		ExportChartOfAccountsCache,
		AxiosError<FetchError>,
		ExportChartOfAccountsCache
	>(chartOfAccountKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportChartOfAccounts(fetch);
	});
}
