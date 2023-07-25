import { MainContainer, ReactQueryHydrate, UserForm } from "@/components";
import { getRoles, roleKeys } from "@/components/views/roles/queries";
import { getUserDetail, userKeys } from "@/components/views/users/queries";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function UserUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(userKeys.detail(), async () => {
			const fetch = createServerSideFetch(token);
			return await getUserDetail(props.params.id || "", fetch);
		}),
		queryClient.prefetchQuery(
			roleKeys.list({ page: 1, pageSize: 10 }),
			async () => {
				const fetch = createServerSideFetch(token);
				return await getRoles({ page: 1, pageSize: 10 }, fetch);
			}
		),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<UserForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
