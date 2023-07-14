import { MainContainer, Vendors } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/utils";
import {
	VendorsQuery,
	getVendors,
	vendorKeys,
} from "@/components/vendors/queries";

export default async function VendorsPage({
	searchParams,
}: {
	searchParams: VendorsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(vendorKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getVendors(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Vendors />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
