import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { detailModel, listModel } from "./role-models";

export type RolesQuery = {
	page: number;
	pageSize: number;
};

export type CreateRoleVariables = {
	name: string;
	description: string;
	type: string;
};

export type UpdateRoleVariables = CreateRoleVariables & {
	id: string;
};

export type DeleteRoleVariables = Pick<UpdateRoleVariables, "id">;

export const roleKeys = {
	all: ["ROLE"],
	list: (query: RolesQuery) => [
		...roleKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...roleKeys.all, "EXPORT_LIST"],
	detail: () => [...roleKeys.all, "DETAIL"],
};

export async function getRoles(
	query: RolesQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(
		`/users-permissions/roles${generateQueryParams(query)}`
	);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetRolesCache = Awaited<ReturnType<typeof getRoles>>;

export function useGetRoles(query: RolesQuery) {
	return useQuery<GetRolesCache, AxiosError<FetchError>, GetRolesCache>(
		roleKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getRoles(query, fetch);
		}
	);
}

export async function createRole(variables: CreateRoleVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/users-permissions/roles", { ...variables });

	return {
		message: "success",
	};
}

type CreateRoleResponse = Awaited<ReturnType<typeof createRole>>;

export function useCreateRole() {
	return useMutation<
		CreateRoleResponse,
		AxiosError<FetchError>,
		CreateRoleVariables
	>(createRole);
}

export async function getRoleDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/users-permissions/roles/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetRoleDetailCache = Awaited<ReturnType<typeof getRoleDetail>>;

export function useGetRoleDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetRoleDetailCache,
		AxiosError<FetchError>,
		GetRoleDetailCache
	>;
}) {
	return useQuery<
		GetRoleDetailCache,
		AxiosError<FetchError>,
		GetRoleDetailCache
	>(
		roleKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getRoleDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateRole({ id, ...rest }: UpdateRoleVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/users-permissions/roles/${id}`, { ...rest });

	return {
		message: "success",
	};
}

type UpdateRoleResponse = Awaited<ReturnType<typeof updateRole>>;

export function useUpdateRole() {
	return useMutation<
		UpdateRoleResponse,
		AxiosError<FetchError>,
		UpdateRoleVariables
	>(updateRole);
}

export async function deleteRole({ id }: DeleteRoleVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/users-permissions/roles/${id}`);
	return {
		message: "success",
	};
}

type DeleteRoleResponse = Awaited<ReturnType<typeof deleteRole>>;

export function useDeleteRole() {
	return useMutation<
		DeleteRoleResponse,
		AxiosError<FetchError>,
		DeleteRoleVariables
	>(deleteRole);
}

export async function exportRoles(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/users-permissions/role/export?type=csv"),
		fetch.get("/users-permissions/role/export?type=excel", {
			responseType: "blob",
		}),
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

type ExportRolesCache = Awaited<ReturnType<typeof exportRoles>>;

export function useExportRoles() {
	return useQuery<ExportRolesCache, AxiosError<FetchError>, ExportRolesCache>(
		roleKeys.export(),
		async () => {
			const fetch = createClientSideFetch();
			return await exportRoles(fetch);
		}
	);
}
