import { Corporates, MainContainer } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/utils";
import {
	CorporatesQuery,
	corporateKeys,
	getCorporates,
} from "@/components/corporates/queries";

export default async function CorporatesPage({
	searchParams,
}: {
	searchParams: CorporatesQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(corporateKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getCorporates(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Corporates />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
