import { MainContainer, ReactQueryHydrate, UserForm } from "@/components";
import { getRoles, roleKeys } from "@/components/views/roles/queries";
import { createServerSideFetch, getQueryClient } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function UserCreatePage() {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		roleKeys.list({ page: 1, pageSize: 10 }),
		async () => {
			const fetch = createServerSideFetch(token);
			return await getRoles({ page: 1, pageSize: 10 }, fetch);
		}
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<UserForm />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
