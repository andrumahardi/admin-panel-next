import { MainContainer, CategoryForm, ReactQueryHydrate } from "@/components";
import {
	categoryTypeKeys,
	getCategoryTypes,
} from "@/components/views/category-types/queries";

import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function CategoryCreatePage() {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		categoryTypeKeys.list({ page: 1, pageSize: 10 }),
		async () => {
			const fetch = createServerSideFetch(token);
			return await getCategoryTypes({ page: 1, pageSize: 10 }, fetch);
		}
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<CategoryForm />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
