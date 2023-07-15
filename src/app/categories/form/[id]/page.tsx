import { MainContainer, CategoryForm, ReactQueryHydrate } from "@/components";
import {
	categoryKeys,
	getCategoryDetail,
} from "@/components/views/categories/queries";
import {
	categoryTypeKeys,
	getCategoryTypes,
} from "@/components/views/category-types/queries";

import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function CategoryUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(categoryKeys.detail(), async () => {
			const fetch = createServerSideFetch(token);
			return await getCategoryDetail(props.params.id || "", fetch);
		}),
		queryClient.prefetchQuery(
			categoryTypeKeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getCategoryTypes({ page: 1, pageSize: 10 }, fetch);
			}
		),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
