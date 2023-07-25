import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { detailModel, listModel } from "./user-models";

export type UsersQuery = {
	page: number;
	pageSize: number;
};

export type CreateUserVariables = {
	username: string;
	email: string;
	role: number;
	password: string;
};

export type UpdateUserVariables = CreateUserVariables & {
	id: string;
};

export type DeleteUserVariables = Pick<UpdateUserVariables, "id">;

export const userKeys = {
	all: ["USER"],
	list: (query: UsersQuery) => [
		...userKeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...userKeys.all, "EXPORT_LIST"],
	detail: () => [...userKeys.all, "DETAIL"],
};

export async function getUsers(
	query: UsersQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/users${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetUsersCache = Awaited<ReturnType<typeof getUsers>>;

export function useGetUsers(query: UsersQuery) {
	return useQuery<GetUsersCache, AxiosError<FetchError>, GetUsersCache>(
		userKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getUsers(query, fetch);
		}
	);
}

export async function createUser(variables: CreateUserVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/users", { ...variables });

	return {
		message: "success",
	};
}

type CreateUserResponse = Awaited<ReturnType<typeof createUser>>;

export function useCreateUser() {
	return useMutation<
		CreateUserResponse,
		AxiosError<FetchError>,
		CreateUserVariables
	>(createUser);
}

export async function getUserDetail(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/users/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetUserDetailCache = Awaited<ReturnType<typeof getUserDetail>>;

export function useGetUserDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetUserDetailCache,
		AxiosError<FetchError>,
		GetUserDetailCache
	>;
}) {
	return useQuery<
		GetUserDetailCache,
		AxiosError<FetchError>,
		GetUserDetailCache
	>(
		userKeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getUserDetail(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateUser({ id, ...rest }: UpdateUserVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/users/${id}`, { ...rest });

	return {
		message: "success",
	};
}

type UpdateUserResponse = Awaited<ReturnType<typeof updateUser>>;

export function useUpdateUser() {
	return useMutation<
		UpdateUserResponse,
		AxiosError<FetchError>,
		UpdateUserVariables
	>(updateUser);
}

export async function deleteUser({ id }: DeleteUserVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/users/${id}`);
	return {
		message: "success",
	};
}

type DeleteUserResponse = Awaited<ReturnType<typeof deleteUser>>;

export function useDeleteUser() {
	return useMutation<
		DeleteUserResponse,
		AxiosError<FetchError>,
		DeleteUserVariables
	>(deleteUser);
}

export async function exportUsers(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/user/export?type=csv"),
		fetch.get("/user/export?type=excel", {
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

type ExportUsersCache = Awaited<ReturnType<typeof exportUsers>>;

export function useExportUsers() {
	return useQuery<ExportUsersCache, AxiosError<FetchError>, ExportUsersCache>(
		userKeys.export(),
		async () => {
			const fetch = createClientSideFetch();
			return await exportUsers(fetch);
		}
	);
}
