import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { listModel, detailModel } from "./bank-transfers-model";

export type BankTransfersQuery = {
	page: number;
	pageSize: number;
};

export type CreateBankTransferVariables = {
	data: {
		amount: string;
		date: string; // format "YYYY-MM-DD"
		reference: string;
		description: string;
	};
};

export type UpdateBankTransferVariables = Pick<
	CreateBankTransferVariables,
	"data"
> & {
	id: string;
};

export type DeleteBankTransferVariables = Pick<
	UpdateBankTransferVariables,
	"id"
>;

export const bankTransferkeys = {
	all: ["BANK_TRANSFERS"],
	list: (query: BankTransfersQuery) => [
		...bankTransferkeys.all,
		"LIST",
		generateQueryParams(query),
	],
	detail: () => [...bankTransferkeys.all, "DETAIL"],
};

export async function getBankTransfers(
	query: BankTransfersQuery,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/bank-transfers${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetBankTransfersCache = Awaited<ReturnType<typeof getBankTransfers>>;

export function useGetBankTransfers(query: BankTransfersQuery) {
	return useQuery<
		GetBankTransfersCache,
		AxiosError<FetchError>,
		GetBankTransfersCache
	>(bankTransferkeys.list(query), async () => {
		const fetch = createClientSideFetch();
		return await getBankTransfers(query, fetch);
	});
}

export async function createBankTransfer(
	variables: CreateBankTransferVariables
) {
	const fetch = createClientSideFetch();
	await fetch.post("/bank-transfers", { ...variables });

	return {
		message: "success",
	};
}

type CreateBankTransferResponse = Awaited<
	ReturnType<typeof createBankTransfer>
>;

export function useCreateBankTransfer() {
	return useMutation<
		CreateBankTransferResponse,
		AxiosError<FetchError>,
		CreateBankTransferVariables
	>(createBankTransfer);
}

export async function getDetailBankTransfer(
	id: string,
	fetch: ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/bank-transfers/${id}`);
	return {
		data: detailModel(res.data),
		meta: res.data.meta,
	};
}

type GetBankTransferDetailCache = Awaited<
	ReturnType<typeof getDetailBankTransfer>
>;

export function useGetBankTransferDetail({
	id,
	options,
}: {
	id: string;
	options?: UseQueryOptions<
		GetBankTransferDetailCache,
		AxiosError<FetchError>,
		GetBankTransferDetailCache
	>;
}) {
	return useQuery<
		GetBankTransferDetailCache,
		AxiosError<FetchError>,
		GetBankTransferDetailCache
	>(
		bankTransferkeys.detail(),
		async () => {
			const fetch = createClientSideFetch();
			return await getDetailBankTransfer(id, fetch);
		},
		{ ...(options ? options : {}) }
	);
}

export async function updateBankTransfer({
	id,
	data,
}: UpdateBankTransferVariables) {
	const fetch = createClientSideFetch();
	await fetch.put(`/bank-transfers/${id}`, { data });

	return {
		message: "success",
	};
}

type UpdateBankTransferResponse = Awaited<
	ReturnType<typeof updateBankTransfer>
>;

export function useUpdateBankTransfer() {
	return useMutation<
		UpdateBankTransferResponse,
		AxiosError<FetchError>,
		UpdateBankTransferVariables
	>(updateBankTransfer);
}

export async function deleteBankTransfer({ id }: DeleteBankTransferVariables) {
	const fetch = createClientSideFetch();
	await fetch.delete(`/bank-transfers/${id}`);
	return {
		message: "success",
	};
}

type DeleteBankTransferResponse = Awaited<
	ReturnType<typeof deleteBankTransfer>
>;

export function useDeleteBankTransfer() {
	return useMutation<
		DeleteBankTransferResponse,
		AxiosError<FetchError>,
		DeleteBankTransferVariables
	>(deleteBankTransfer);
}
