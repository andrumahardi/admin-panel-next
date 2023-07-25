import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./customer-groups-model";

export type CustomerGroupsQuery = {
	page: number;
	pageSize: number;
};

export type CreateCustomerGroupVariables = {
	data: {
		code: string;
		name: string;
		client_code: string;
	};
};

export type UpdateCustomerGroupVariables = Pick<
	CreateCustomerGroupVariables,
	"data"
> & {
	id: string;
};

export type DeleteCustomerGroupVariables = Pick<
	UpdateCustomerGroupVariables,
	"id"
>;

export const customerGroupKeys = {
	all: ["CUSTOMER_GROUPS"],
	list: (query: CustomerGroupsQuery) => [
		...customerGroupKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...customerGroupKeys.all, "EXPORT_LIST"],
	detail: () => [...customerGroupKeys.all, "DETAIL"],
};

export async function getCustomerGroups(
	query: CustomerGroupsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/customer-groups${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetCustomergroupsCache = Awaited<ReturnType<typeof getCustomerGroups>>;

export function useGetCustomerGroups(query: CustomerGroupsQuery) {
	return useQuery<
		GetCustomergroupsCache,
		AxiosError<FetchError>,
		GetCustomergroupsCache
	>(customerGroupKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getCustomerGroups(query, fetch);
	});
}

export async function createCustomerGroup(
	variables: CreateCustomerGroupVariables
) {
	const fetch = createClientSideFetch();
	await fetch.post("/customer-groups", { ...variables });

	return {
		message: "success",
	};
}

type CreateCustomerGroupResponse = Awaited<
	ReturnType<typeof createCustomerGroup>
>;

export function useCreateCustomerGroup() {
	return useMutation<
		CreateCustomerGroupResponse,
		AxiosError<FetchError>,
		CreateCustomerGroupVariables
	>(createCustomerGroup);
}

export async function getDetailCustomerGroup(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/customer-groups/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetCustomerGroupDetailCache = Awaited<
	ReturnType<typeof getDetailCustomerGroup>
>;

export function useGetCustomerGroupDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetCustomerGroupDetailCache,
		AxiosError<FetchError>,
		GetCustomerGroupDetailCache
	>;
}) {
	return useQuery<
		GetCustomerGroupDetailCache,
		AxiosError<FetchError>,
		GetCustomerGroupDetailCache
	>(
		customerGroupKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailCustomerGroup(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateCustomergroup({
	id,
	data,
}: UpdateCustomerGroupVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/customer-groups/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateCustomerGroupResponse = Awaited<
	ReturnType<typeof updateCustomergroup>
>;

export function useUpdateCustomerGroup() {
	return useMutation<
		UpdateCustomerGroupResponse,
		AxiosError<FetchError>,
		UpdateCustomerGroupVariables
	>(updateCustomergroup);
}

export async function deleteCustomerGroup({
	id,
}: DeleteCustomerGroupVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/customer-groups/${id}`);
	return {
		message: "success",
	};
}

type DeleteCustomerGroupResponse = Awaited<
	ReturnType<typeof deleteCustomerGroup>
>;

export function useDeleteCustomerGroup() {
	return useMutation<
		DeleteCustomerGroupResponse,
		AxiosError<FetchError>,
		DeleteCustomerGroupVariables
	>(deleteCustomerGroup);
}

export async function exportCustomerGroups(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/customer-group/export?type=csv"),
		fetch.get("/customer-group/export?type=excel", { responseType: "blob" }),
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

type ExportCustomerGroupsCache = Awaited<
	ReturnType<typeof exportCustomerGroups>
>;

export function useExportCustomerGroups() {
	return useQuery<
		ExportCustomerGroupsCache,
		AxiosError<FetchError>,
		ExportCustomerGroupsCache
	>(customerGroupKeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportCustomerGroups(fetch);
	});
}
