import { BankTransfers, MainContainer, ReactQueryHydrate } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	BankTransfersQuery,
	bankTransferkeys,
	getBankTransfers,
} from "@/components/views/bank-transfers/queries";

export default async function BankTransfersPage({
	searchParams,
}: {
	searchParams: BankTransfersQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};

	const bankTransferQuery = {
		...query,
		populate: ["from_bank_account", "to_bank_account"],
	};

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		bankTransferkeys.list(bankTransferQuery),
		async () => {
			const fetch = createServerSideFetch(token);
			return await getBankTransfers(bankTransferQuery, fetch);
		}
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankTransfers />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
