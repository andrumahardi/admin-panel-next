import { MainContainer, CategoryTypeForm } from "@/components";
import {
	categoryTypeKeys,
	getCategoryTypeDetail,
} from "@/components/category-types/queries";
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

export default async function CategoryTypeUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(categoryTypeKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getCategoryTypeDetail(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryTypeForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
