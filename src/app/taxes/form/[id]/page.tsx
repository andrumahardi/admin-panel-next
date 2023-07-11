import { MainContainer, TaxForm } from "@/components";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { getTaxDetail, taxKeys } from "@/components/taxes/queries";
import { getQueryClient } from "@/libs";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function TaxUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(taxKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getTaxDetail(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<TaxForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
