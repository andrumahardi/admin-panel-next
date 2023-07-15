import { CategoryTypes, MainContainer, ReactQueryHydrate } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils";
import {
	CategoryTypesQuery,
	categoryTypeKeys,
	getCategoryTypes,
} from "@/components/views/category-types/queries";

export default async function CategoryTypesPage({
	searchParams,
}: {
	searchParams: CategoryTypesQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(categoryTypeKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getCategoryTypes(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryTypes />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
