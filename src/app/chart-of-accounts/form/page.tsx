import {
	MainContainer,
	ChartOfAccountForm,
	ReactQueryHydrate,
} from "@/components";
import {
	categoryAccountKeys,
	getCategoryAccounts,
} from "@/components/views/category-accounts/queries";

import {
	getTypeAccounts,
	typeAccountKeys,
} from "@/components/views/type-accounts/queries";
import { createServerSideFetch, getQueryClient } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function ChartOfAccountCreatePage() {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(
			typeAccountKeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getTypeAccounts({ page: 1, pageSize: 10 }, fetch);
			}
		),
		queryClient.prefetchQuery(
			categoryAccountKeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getCategoryAccounts({ page: 1, pageSize: 10 }, fetch);
			}
		),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<ChartOfAccountForm />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
