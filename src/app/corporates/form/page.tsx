import { MainContainer, CorporateForm, ReactQueryHydrate } from "@/components";
import {
	customerGroupKeys,
	getCustomerGroups,
} from "@/components/views/customer-groups/queries";

import { createServerSideFetch, getQueryClient } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function CorporateCreatePage() {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		customerGroupKeys.list({ page: 1, pageSize: 10 }),
		async () => {
			const fetch = createServerSideFetch(token);
			return await getCustomerGroups({ page: 1, pageSize: 10 }, fetch);
		}
	);
	const dehydratedState = dehydrate(queryClient);
	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CorporateForm />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
