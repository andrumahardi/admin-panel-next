import {
	MainContainer,
	BankTransferForm,
	ReactQueryHydrate,
} from "@/components";
import {
	bankAccountkeys,
	getBankAccounts,
} from "@/components/views/bank-accounts/queries";
import { createServerSideFetch, getQueryClient } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function BankTransferCreatePage() {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		bankAccountkeys.list({ page: 1, pageSize: 10 }),
		async () => {
			const fetch = createServerSideFetch(token);
			return await getBankAccounts({ page: 1, pageSize: 10 }, fetch);
		}
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankTransferForm />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
