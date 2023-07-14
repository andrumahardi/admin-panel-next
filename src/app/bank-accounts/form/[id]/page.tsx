import { MainContainer, BankAccountForm } from "@/components";
import {
	bankAccountkeys,
	getDetailBankAccount,
} from "@/components/bank-accounts/queries";
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

export default async function BankAccountUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(bankAccountkeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailBankAccount(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<BankAccountForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}