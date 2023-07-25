import { MainContainer, ReactQueryHydrate, Users } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils";
import {
	UsersQuery,
	getUsers,
	userKeys,
} from "@/components/views/users/queries";

export default async function UsersPage({
	searchParams,
}: {
	searchParams: UsersQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(userKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getUsers(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Users />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
