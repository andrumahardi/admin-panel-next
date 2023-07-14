import { MainContainer, ChartOfAccountForm } from "@/components";
import {
	chartOfAccountKeys,
	getDetailChartOfAccount,
} from "@/components/chart-of-accounts/queries";
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

export default async function ChartOfAccountUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(chartOfAccountKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailChartOfAccount(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<ChartOfAccountForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
