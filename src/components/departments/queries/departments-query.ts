import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./departments-model";

export type DepartmentsQuery = {
	page: number;
	pageSize: number;
};

export type CreateDepartmentVariables = {
	data: {
		name: string;
	};
};

export type UpdateDepartmentVariables = Pick<
	CreateDepartmentVariables,
	"data"
> & {
	id: string;
};

export type DeleteDepartmentVariables = Pick<UpdateDepartmentVariables, "id">;

export const departmentKeys = {
	all: ["DEPARTMENTS"],
	list: (query: DepartmentsQuery) => [
		...departmentKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...departmentKeys.all, "DETAIL"],
};

export async function getDepartments(
	query: DepartmentsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/departments${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetDepartmentsCache = Awaited<ReturnType<typeof getDepartments>>;

export function useGetDepartments(query: DepartmentsQuery) {
	return useQuery<
		GetDepartmentsCache,
		AxiosError<FetchError>,
		GetDepartmentsCache
	>(departmentKeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getDepartments(query, fetch);
	});
}

export async function createDepartment(variables: CreateDepartmentVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/departments", { ...variables });

	return {
		message: "success",
	};
}

type CreateDepartmentResponse = Awaited<ReturnType<typeof createDepartment>>;

export function useCreateDepartment() {
	return useMutation<
		CreateDepartmentResponse,
		AxiosError<FetchError>,
		CreateDepartmentVariables
	>(createDepartment);
}

export async function getDepartmentDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/departments/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetDepartmentDetailCache = Awaited<ReturnType<typeof getDepartmentDetail>>;

export function useGetDepartmentDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetDepartmentDetailCache,
		AxiosError<FetchError>,
		GetDepartmentDetailCache
	>;
}) {
	return useQuery<
		GetDepartmentDetailCache,
		AxiosError<FetchError>,
		GetDepartmentDetailCache
	>(
		departmentKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDepartmentDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateDepartment({
	id,
	data,
}: UpdateDepartmentVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/departments/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateDepartmentResponse = Awaited<ReturnType<typeof updateDepartment>>;

export function useUpdateDepartment() {
	return useMutation<
		UpdateDepartmentResponse,
		AxiosError<FetchError>,
		UpdateDepartmentVariables
	>(updateDepartment);
}

export async function deleteDepartment({ id }: DeleteDepartmentVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/departments/${id}`);
	return {
		message: "success",
	};
}

type DeleteDepartmentResponse = Awaited<ReturnType<typeof deleteDepartment>>;

export function useDeleteDepartment() {
	return useMutation<
		DeleteDepartmentResponse,
		AxiosError<FetchError>,
		DeleteDepartmentVariables
	>(deleteDepartment);
}
