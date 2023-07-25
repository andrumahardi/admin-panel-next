import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./vendors-model";

export type VendorsQuery = {
	page: number;
	pageSize: number;
};

export type CreateVendorVariables = {
	data: {
		name: string;
		email: string;
		bank_code: string;
		bank_name: string;
		account_number: string;
		account_name: string;
	};
};

export type UpdateVendorVariables = Pick<CreateVendorVariables, "data"> & {
	id: string;
};

export type DeleteVendorVariables = Pick<UpdateVendorVariables, "id">;

export const vendorKeys = {
	all: ["VENDORS"],
	list: (query: VendorsQuery) => [
		...vendorKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...vendorKeys.all, "EXPORT_LIST"],
	detail: () => [...vendorKeys.all, "DETAIL"],
};

export async function getVendors(
	query: VendorsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/vendors${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetVendorsCache = Awaited<ReturnType<typeof getVendors>>;

export function useGetVendors(query: VendorsQuery) {
	return useQuery<GetVendorsCache, AxiosError<FetchError>, GetVendorsCache>(
		vendorKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getVendors(query, fetch);
		}
	);
}

export async function createVendor(variables: CreateVendorVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/vendors", { ...variables });

	return {
		message: "success",
	};
}

type CreateVendorResponse = Awaited<ReturnType<typeof createVendor>>;

export function useCreateVendor() {
	return useMutation<
		CreateVendorResponse,
		AxiosError<FetchError>,
		CreateVendorVariables
	>(createVendor);
}

export async function getDetailVendor(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/vendors/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetDetailVendorCache = Awaited<ReturnType<typeof getDetailVendor>>;

export function useGetVendorDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetDetailVendorCache,
		AxiosError<FetchError>,
		GetDetailVendorCache
	>;
}) {
	return useQuery<
		GetDetailVendorCache,
		AxiosError<FetchError>,
		GetDetailVendorCache
	>(
		vendorKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailVendor(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateVendor({ id, data }: UpdateVendorVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/vendors/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateVendorResponse = Awaited<ReturnType<typeof updateVendor>>;

export function useUpdateVendor() {
	return useMutation<
		UpdateVendorResponse,
		AxiosError<FetchError>,
		UpdateVendorVariables
	>(updateVendor);
}

export async function deleteVendor({ id }: DeleteVendorVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/vendors/${id}`);
	return {
		message: "success",
	};
}

type DeleteVendorResponse = Awaited<ReturnType<typeof deleteVendor>>;

export function useDeleteVendor() {
	return useMutation<
		DeleteVendorResponse,
		AxiosError<FetchError>,
		DeleteVendorVariables
	>(deleteVendor);
}

export async function exportVendors(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/vendor/export?type=csv"),
		fetch.get("/vendor/export?type=excel", { responseType: "blob" }),
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

type ExportVendorsCache = Awaited<ReturnType<typeof exportVendors>>;

export function useExportVendors() {
	return useQuery<
		ExportVendorsCache,
		AxiosError<FetchError>,
		ExportVendorsCache
	>(vendorKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportVendors(fetch);
	});
}
