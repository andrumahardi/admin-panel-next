import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./category-accounts-model";

export type CategoryAccountsQuery = {
	page: number;
	pageSize: number;
};

export type CreateCategoryAccountVariables = {
	data: {
		name: string;
	};
};

export type UpdateCategoryAccountVariables = Pick<
	CreateCategoryAccountVariables,
	"data"
> & {
	id: string;
};

export type DeleteCategoryAccountVariables = Pick<
	UpdateCategoryAccountVariables,
	"id"
>;

export const categoryAccountKeys = {
	all: ["CATEGORY_ACCOUNTS"],
	list: (query: CategoryAccountsQuery) => [
		...categoryAccountKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...categoryAccountKeys.all, "DETAIL"],
};

export async function getCategoryAccounts(
	query: CategoryAccountsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(
		`/category-accounts${generateQueryParams(query)}`
	);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoryAccountsCache = Awaited<ReturnType<typeof getCategoryAccounts>>;

export function useGetCategoryAccounts(query: CategoryAccountsQuery) {
	return useQuery<
		GetCategoryAccountsCache,
		AxiosError<FetchError>,
		GetCategoryAccountsCache
	>(categoryAccountKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getCategoryAccounts(query, fetch);
	});
}

export async function createCategoryAccount(
	variables: CreateCategoryAccountVariables
) {
	const fetch = createClientSideFetch();
	await fetch.post("/category-accounts", { ...variables });

	return {
		message: "success",
	};
}

type CreateCategoryAccountResponse = Awaited<
	ReturnType<typeof createCategoryAccount>
>;

export function useCreateCategoryAccount() {
	return useMutation<
		CreateCategoryAccountResponse,
		AxiosError<FetchError>,
		CreateCategoryAccountVariables
	>(createCategoryAccount);
}

export async function getDetailCategoryAccount(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/category-accounts/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoryAccountDetailCache = Awaited<
	ReturnType<typeof getDetailCategoryAccount>
>;

export function useGetCategoryAccountDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetCategoryAccountDetailCache,
		AxiosError<FetchError>,
		GetCategoryAccountDetailCache
	>;
}) {
	return useQuery<
		GetCategoryAccountDetailCache,
		AxiosError<FetchError>,
		GetCategoryAccountDetailCache
	>(
		categoryAccountKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailCategoryAccount(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateCategoryAccount({
	id,
	data,
}: UpdateCategoryAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/category-accounts/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateCategoryAccountResponse = Awaited<
	ReturnType<typeof updateCategoryAccount>
>;

export function useUpdateCategoryAccount() {
	return useMutation<
		UpdateCategoryAccountResponse,
		AxiosError<FetchError>,
		UpdateCategoryAccountVariables
	>(updateCategoryAccount);
}

export async function deleteCategoryAccount({
	id,
}: DeleteCategoryAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/category-accounts/${id}`);
	return {
		message: "success",
	};
}

type DeleteCategoryAccountResponse = Awaited<
	ReturnType<typeof deleteCategoryAccount>
>;

export function useDeleteCategoryAccount() {
	return useMutation<
		DeleteCategoryAccountResponse,
		AxiosError<FetchError>,
		DeleteCategoryAccountVariables
	>(deleteCategoryAccount);
}
