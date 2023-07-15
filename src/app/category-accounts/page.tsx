import {
	CategoryAccounts,
	MainContainer,
	ReactQueryHydrate,
} from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	CategoryAccountsQuery,
	categoryAccountKeys,
	getCategoryAccounts,
} from "@/components/views/category-accounts/queries";

export default async function CategoryAccountsPage({
	searchParams,
}: {
	searchParams: CategoryAccountsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(categoryAccountKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getCategoryAccounts(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryAccounts />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
