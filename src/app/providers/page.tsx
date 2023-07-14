import { MainContainer, Providers } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/utils";
import {
	ProvidersQuery,
	getProviders,
	providerKeys,
} from "@/components/providers/queries";

export default async function ProvidersPage({
	searchParams,
}: {
	searchParams: ProvidersQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(providerKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getProviders(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Providers />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
