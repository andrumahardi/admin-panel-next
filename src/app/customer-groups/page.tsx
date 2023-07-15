import { CustomerGroups, MainContainer, ReactQueryHydrate } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	CustomerGroupsQuery,
	customerGroupKeys,
	getCustomerGroups,
} from "@/components/views/customer-groups/queries";

export default async function CustomerGroupsPage({
	searchParams,
}: {
	searchParams: CustomerGroupsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(customerGroupKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getCustomerGroups(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CustomerGroups />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
