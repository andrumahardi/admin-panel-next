import { MainContainer, ProviderForm, ReactQueryHydrate } from "@/components";

import {
	getDetailProvider,
	providerKeys,
} from "@/components/views/providers/queries";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function ProviderUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(providerKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailProvider(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<ProviderForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
