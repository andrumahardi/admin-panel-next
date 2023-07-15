import { MainContainer, ReactQueryHydrate, TypeAccounts } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	TypeAccountsQuery,
	getTypeAccounts,
	typeAccountKeys,
} from "@/components/views/type-accounts/queries";

export default async function TypeAccountsPage({
	searchParams,
}: {
	searchParams: TypeAccountsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(typeAccountKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getTypeAccounts(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<TypeAccounts />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
