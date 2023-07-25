import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./bank-accounts-model";

export type BankAccountsQuery = {
	page: number;
	pageSize: number;
};

export type CreateBankAccountVariables = {
	data: {
		holder_name: string;
		bank_name: string;
		account_number: string;
		opening_balance: string;
		contact_number: string;
		bank_address: string;
	};
};

export type UpdateBankAccountVariables = Pick<
	CreateBankAccountVariables,
	"data"
> & {
	id: string;
};

export type DeleteBankAccountVariables = Pick<UpdateBankAccountVariables, "id">;

export const bankAccountkeys = {
	all: ["BANK_ACCOUNTS"],
	list: (query: BankAccountsQuery) => [
		...bankAccountkeys.all,
		"LIST",
		generateQueryParams(query),
	],
	export: () => [...bankAccountkeys.all, "EXPORT_LIST"],
	detail: () => [...bankAccountkeys.all, "DETAIL"],
};

export async function getBankAccounts(
	query: BankAccountsQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/bank-accounts${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetBankAccountsCache = Awaited<ReturnType<typeof getBankAccounts>>;

export function useGetBankAccounts(query: BankAccountsQuery) {
	return useQuery<
		GetBankAccountsCache,
		AxiosError<FetchError>,
		GetBankAccountsCache
	>(bankAccountkeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getBankAccounts(query, fetch);
	});
}

export async function createBankAccount(variables: CreateBankAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.post("/bank-accounts", { ...variables });

	return {
		message: "success",
	};
}

type CreateBankAccountResponse = Awaited<ReturnType<typeof createBankAccount>>;

export function useCreateBankAccount() {
	return useMutation<
		CreateBankAccountResponse,
		AxiosError<FetchError>,
		CreateBankAccountVariables
	>(createBankAccount);
}

export async function getDetailBankAccount(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/bank-accounts/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetBankAccountDetailCache = Awaited<
	ReturnType<typeof getDetailBankAccount>
>;

export function useGetBankAccountDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetBankAccountDetailCache,
		AxiosError<FetchError>,
		GetBankAccountDetailCache
	>;
}) {
	return useQuery<
		GetBankAccountDetailCache,
		AxiosError<FetchError>,
		GetBankAccountDetailCache
	>(
		bankAccountkeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailBankAccount(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateBankAccount({
	id,
	data,
}: UpdateBankAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/bank-accounts/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateBankAccountResponse = Awaited<ReturnType<typeof updateBankAccount>>;

export function useUpdateBankAccount() {
	return useMutation<
		UpdateBankAccountResponse,
		AxiosError<FetchError>,
		UpdateBankAccountVariables
	>(updateBankAccount);
}

export async function deleteBankAccount({ id }: DeleteBankAccountVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/bank-accounts/${id}`);
	return {
		message: "success",
	};
}

type DeleteBankAccountResponse = Awaited<ReturnType<typeof deleteBankAccount>>;

export function useDeleteBankAccount() {
	return useMutation<
		DeleteBankAccountResponse,
		AxiosError<FetchError>,
		DeleteBankAccountVariables
	>(deleteBankAccount);
}

export async function exportBankAccounts(
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const [csv, excel] = await Promise.all([
		fetch.get("/bank-account/export?type=csv"),
		fetch.get("/bank-account/export?type=excel", { responseType: "blob" }),
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

type ExportBankAccountsCache = Awaited<ReturnType<typeof exportBankAccounts>>;

export function useExportBankAccounts() {
	return useQuery<
		ExportBankAccountsCache,
		AxiosError<FetchError>,
		ExportBankAccountsCache
	>(bankAccountkeys.export(), async () => {
		const fetch = createClientSideFetch();
		return await exportBankAccounts(fetch);
	});
}
