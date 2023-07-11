import { MainContainer } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/libs";
import {
	CategoriesQuery,
	categoryKeys,
	getCategories,
} from "@/components/categories/queries";
import { Categories } from "@/components/categories";

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
