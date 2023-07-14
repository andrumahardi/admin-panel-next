import { MainContainer, VendorForm } from "@/components";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { getDetailVendor, vendorKeys } from "@/components/vendors/queries";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function VendorUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(vendorKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailVendor(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<VendorForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
