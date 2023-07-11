import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { taxDetailModel, taxListModel } from "./tax-models";

export type TaxesQuery = {
	page: number;
	pageSize: number;
};

export type CreateTaxVariables = {
	data: {
		Name: string;
		Rate: string;
	};
};

export type UpdateTaxVariables = Pick<CreateTaxVariables, "data"> & {
	id: string;
};

export type DeleteTaxVariables = Pick<UpdateTaxVariables, "id">;

export const taxKeys = {
	all: ["TAX"],
	list: (query: TaxesQuery) => [
		...taxKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...taxKeys.all, "DETAIL"],
};

export async function getTaxes(
	query: TaxesQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/taxes${generateQueryParams(query)}`);
	return {
		data: taxListModel(res.data),
		meta: res.data.meta,
	};
}

type GetTaxesCache = Awaited<ReturnType<typeof getTaxes>>;

export function useGetTaxes(query: TaxesQuery) {
	return useQuery<GetTaxesCache, AxiosError<FetchError>, GetTaxesCache>(
		taxKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getTaxes(query, fetch);
		}
	);
}

export async function createTax(variables: CreateTaxVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/taxes", { ...variables });

	return {
		message: "success",
	};
}

type CreateTaxResponse = Awaited<ReturnType<typeof createTax>>;

export function useCreateTax() {
	return useMutation<
		CreateTaxResponse,
		AxiosError<FetchError>,
		CreateTaxVariables
	>(createTax);
}

export async function getTaxDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/taxes/${id}`);
	return {
		data: taxDetailModel(res.data),
		meta: res.data.meta,
	};
}

type GetTaxDetailCache = Awaited<ReturnType<typeof getTaxDetail>>;

export function useGetTaxDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetTaxDetailCache,
		AxiosError<FetchError>,
		GetTaxDetailCache
	>;
}) {
	return useQuery<GetTaxDetailCache, AxiosError<FetchError>, GetTaxDetailCache>(
		taxKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getTaxDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateTax({ id, data }: UpdateTaxVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/taxes/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateTaxResponse = Awaited<ReturnType<typeof updateTax>>;

export function useUpdateTax() {
	return useMutation<
		UpdateTaxResponse,
		AxiosError<FetchError>,
		UpdateTaxVariables
	>(updateTax);
}

export async function deleteTax({ id }: DeleteTaxVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/taxes/${id}`);
	return {
		message: "success",
	};
}

type DeleteTaxResponse = Awaited<ReturnType<typeof deleteTax>>;

export function useDeleteTax() {
	return useMutation<
		DeleteTaxResponse,
		AxiosError<FetchError>,
		DeleteTaxVariables
	>(deleteTax);
}
