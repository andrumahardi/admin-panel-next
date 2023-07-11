import { MainContainer, Taxes } from "@/components";
import { cookies } from "next/headers";
import {
	TaxesQuery,
	getTaxes,
	taxKeys,
} from "@/components/taxes/queries/tax-queries";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/libs";

export default async function TaxesPage({
	searchParams,
}: {
	searchParams: TaxesQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(taxKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getTaxes(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Taxes />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
