import { MainContainer, BankTransferForm } from "@/components";
import {
	bankTransferkeys,
	getDetailBankTransfer,
} from "@/components/bank-transfers/queries";
import { ReactQueryHydrate } from "@/components/hydrate-client";
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
	await queryClient.prefetchQuery(bankTransferkeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailBankTransfer(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankTransferForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
