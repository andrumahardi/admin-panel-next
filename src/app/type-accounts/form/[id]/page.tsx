import { MainContainer, TypeAccountForm } from "@/components";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import {
	getDetailTypeAccount,
	typeAccountKeys,
} from "@/components/type-accounts/queries";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function TypeAccountUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(typeAccountKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailTypeAccount(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<TypeAccountForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
