import { MainContainer, CorporateForm, ReactQueryHydrate } from "@/components";
import {
	corporateKeys,
	getDetailCorporate,
} from "@/components/views/corporates/queries";
import {
	customerGroupKeys,
	getCustomerGroups,
} from "@/components/views/customer-groups/queries";

import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function CorporateUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(corporateKeys.detail(), async () => {
			const fetch = createServerSideFetch(token);
			return await getDetailCorporate(props.params.id || "", fetch);
		}),
		queryClient.prefetchQuery(
			customerGroupKeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getCustomerGroups({ page: 1, pageSize: 10 }, fetch);
			}
		),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CorporateForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
