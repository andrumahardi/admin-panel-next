import { MainContainer, CustomerGroupForm } from "@/components";
import {
	customerGroupKeys,
	getDetailCustomerGroup,
} from "@/components/customer-groups/queries";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function CustomerGroupUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(customerGroupKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailCustomerGroup(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CustomerGroupForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
