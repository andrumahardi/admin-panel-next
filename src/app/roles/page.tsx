import { MainContainer, ReactQueryHydrate, Roles } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils";
import {
	RolesQuery,
	getRoles,
	roleKeys,
} from "@/components/views/roles/queries";

export default async function RolesPage({
	searchParams,
}: {
	searchParams: RolesQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(roleKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getRoles(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Roles />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
