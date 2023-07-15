import { BankAccounts, MainContainer, ReactQueryHydrate } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils";
import {
	BankAccountsQuery,
	bankAccountkeys,
	getBankAccounts,
} from "@/components/views/bank-accounts/queries";

export default async function BankAccountsPage({
	searchParams,
}: {
	searchParams: BankAccountsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(bankAccountkeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getBankAccounts(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankAccounts />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
