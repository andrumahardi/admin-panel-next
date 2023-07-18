import {
	MainContainer,
	BankTransferForm,
	ReactQueryHydrate,
} from "@/components";
import {
	bankAccountkeys,
	getBankAccounts,
} from "@/components/views/bank-accounts/queries";
import {
	bankTransferkeys,
	getDetailBankTransfer,
} from "@/components/views/bank-transfers/queries";

import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function BankTransferUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await Promise.all([
		await queryClient.prefetchQuery(
			bankAccountkeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getBankAccounts({ page: 1, pageSize: 10 }, fetch);
			}
		),
		queryClient.prefetchQuery(bankTransferkeys.detail(), async () => {
			const fetch = createServerSideFetch(token);
			return await getDetailBankTransfer(props.params.id || "", fetch);
		}),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankTransferForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
