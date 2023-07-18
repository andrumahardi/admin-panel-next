import { Categories, MainContainer, ReactQueryHydrate } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	CategoriesQuery,
	categoryKeys,
	getCategories,
} from "@/components/views/categories/queries";

export default async function CategoriesPage({
	searchParams,
}: {
	searchParams: CategoriesQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
		populate: "category_type",
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(categoryKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getCategories(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Categories />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
