import {
	ChartOfAccounts,
	MainContainer,
	ReactQueryHydrate,
} from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	ChartOfAccountsQuery,
	chartOfAccountKeys,
	getChartOfAccounts,
} from "@/components/views/chart-of-accounts/queries";

export default async function ChartOfAccountsPage({
	searchParams,
}: {
	searchParams: ChartOfAccountsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
		populate: ["category_account", "type_account"],
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(chartOfAccountKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getChartOfAccounts(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<ChartOfAccounts />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
