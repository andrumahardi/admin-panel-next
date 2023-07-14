import { MainContainer, CategoryAccountForm } from "@/components";
import {
	categoryAccountKeys,
	getDetailCategoryAccount,
} from "@/components/category-accounts/queries";
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

export default async function CategoryAccountUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(categoryAccountKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDetailCategoryAccount(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryAccountForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
