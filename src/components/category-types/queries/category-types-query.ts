import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
	categoryTypeDetailModel,
	categoryTypeListModel,
} from "./category-types-model";

export type CategoryTypesQuery = {
	page: number;
	pageSize: number;
};

export type CreateCategoryTypeVariables = {
	data: {
		Name: string;
	};
};

export type UpdateCategoryTypeVariables = Pick<
	CreateCategoryTypeVariables,
	"data"
> & {
	id: string;
};

export type DeleteCategoryTypeVariables = Pick<
	UpdateCategoryTypeVariables,
	"id"
>;

export const categoryTypeKeys = {
	all: ["CATEGORY_TYPES"],
	list: (query: CategoryTypesQuery) => [
		...categoryTypeKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...categoryTypeKeys.all, "DETAIL"],
};

export async function getCategoryTypes(
	query: CategoryTypesQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/category-types${generateQueryParams(query)}`);
	return {
		data: categoryTypeListModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoryTypesCache = Awaited<ReturnType<typeof getCategoryTypes>>;

export function useGetCategoryTypes(query: CategoryTypesQuery) {
	return useQuery<
		GetCategoryTypesCache,
		AxiosError<FetchError>,
		GetCategoryTypesCache
	>(categoryTypeKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getCategoryTypes(query, fetch);
	});
}

export async function createCategoryType(
	variables: CreateCategoryTypeVariables
) {
	const fetch = createClientSideFetch();
	await fetch.post("/category-types", { ...variables });

	return {
		message: "success",
	};
}

type CreateCategoryTypeResponse = Awaited<
	ReturnType<typeof createCategoryType>
>;

export function useCreateCategoryType() {
	return useMutation<
		CreateCategoryTypeResponse,
		AxiosError<FetchError>,
		CreateCategoryTypeVariables
	>(createCategoryType);
}

export async function getCategoryTypeDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/category-types/${id}`);
	return {
		data: categoryTypeDetailModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoryTypeDetailCache = Awaited<
	ReturnType<typeof getCategoryTypeDetail>
>;

export function useGetCategoryTypeDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetCategoryTypeDetailCache,
		AxiosError<FetchError>,
		GetCategoryTypeDetailCache
	>;
}) {
	return useQuery<
		GetCategoryTypeDetailCache,
		AxiosError<FetchError>,
		GetCategoryTypeDetailCache
	>(
		categoryTypeKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getCategoryTypeDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateCategoryType({
	id,
	data,
}: UpdateCategoryTypeVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/category-types/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateCategoryTypeResponse = Awaited<
	ReturnType<typeof updateCategoryType>
>;

export function useUpdateCategoryType() {
	return useMutation<
		UpdateCategoryTypeResponse,
		AxiosError<FetchError>,
		UpdateCategoryTypeVariables
	>(updateCategoryType);
}

export async function deleteCategoryType({ id }: DeleteCategoryTypeVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/category-types/${id}`);
	return {
		message: "success",
	};
}

type DeleteCategoryTypeResponse = Awaited<
	ReturnType<typeof deleteCategoryType>
>;

export function useDeleteCategoryType() {
	return useMutation<
		DeleteCategoryTypeResponse,
		AxiosError<FetchError>,
		DeleteCategoryTypeVariables
	>(deleteCategoryType);
}
