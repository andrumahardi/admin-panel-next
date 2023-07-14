import { MainContainer, CorporateForm } from "@/components";
import {
	corporateKeys,
	getDetailCorporate,
} from "@/components/corporates/queries";
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

export default async function CorporateUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(corporateKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailCorporate(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CorporateForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
