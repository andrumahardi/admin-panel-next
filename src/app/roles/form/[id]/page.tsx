import { MainContainer, ReactQueryHydrate, RoleForm } from "@/components";
import { getRoleDetail, roleKeys } from "@/components/views/roles/queries";
import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function RoleUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(roleKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getRoleDetail(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<RoleForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
