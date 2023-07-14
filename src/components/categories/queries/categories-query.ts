import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { categoryListModel, categoryDetailModel } from "./categories-model";

export type CategoriesQuery = {
	page: number;
	pageSize: number;
};

export type CreateCategoryVariables = {
	data: {
		name: string;
		category_type: number;
	};
};

export type UpdateCategoryVariables = Pick<CreateCategoryVariables, "data"> & {
	id: string;
};

export type DeleteCategoryVariables = Pick<UpdateCategoryVariables, "id">;

export const categoryKeys = {
	all: ["CATEGORIES"],
	list: (query: CategoriesQuery) => [
		...categoryKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...categoryKeys.all, "DETAIL"],
};

export async function getCategories(
	query: CategoriesQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/categories${generateQueryParams(query)}`);
	return {
		data: categoryListModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoriesCache = Awaited<ReturnType<typeof getCategories>>;

export function useGetCategories(query: CategoriesQuery) {
	return useQuery<
		GetCategoriesCache,
		AxiosError<FetchError>,
		GetCategoriesCache
	>(categoryKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getCategories(query, fetch);
	});
}

export async function createCategory(variables: CreateCategoryVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/categories", { ...variables });

	return {
		message: "success",
	};
}

type CreateCategoryResponse = Awaited<ReturnType<typeof createCategory>>;

export function useCreateCategory() {
	return useMutation<
		CreateCategoryResponse,
		AxiosError<FetchError>,
		CreateCategoryVariables
	>(createCategory);
}

export async function getCategoryDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/categories/${id}`);
	return {
		data: categoryDetailModel(res.data),
		meta: res.data.meta,
	};
}

type GetCategoryDetailCache = Awaited<ReturnType<typeof getCategoryDetail>>;

export function useGetCategoryDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetCategoryDetailCache,
		AxiosError<FetchError>,
		GetCategoryDetailCache
	>;
}) {
	return useQuery<
		GetCategoryDetailCache,
		AxiosError<FetchError>,
		GetCategoryDetailCache
	>(
		categoryKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getCategoryDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateCategory({ id, data }: UpdateCategoryVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/categories/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateCategoryResponse = Awaited<ReturnType<typeof updateCategory>>;

export function useUpdateCategory() {
	return useMutation<
		UpdateCategoryResponse,
		AxiosError<FetchError>,
		UpdateCategoryVariables
	>(updateCategory);
}

export async function deleteCategory({ id }: DeleteCategoryVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/categories/${id}`);
	return {
		message: "success",
	};
}

type DeleteCategoryResponse = Awaited<ReturnType<typeof deleteCategory>>;

export function useDeleteCategory() {
	return useMutation<
		DeleteCategoryResponse,
		AxiosError<FetchError>,
		DeleteCategoryVariables
	>(deleteCategory);
}
