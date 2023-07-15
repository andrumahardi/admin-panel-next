import { MainContainer, DepartmentForm, ReactQueryHydrate } from "@/components";
import {
	departmentKeys,
	getDepartmentDetail,
} from "@/components/views/departments/queries";

import { getQueryClient } from "@/utils";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
	params: {
		id: string;
	};
};

export default async function DepartmentUpdatePage(props: Props) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(departmentKeys.detail(), async () => {
		const fetch = createServerSideFetch(token);
		return await getDepartmentDetail(props.params.id || "", fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<DepartmentForm id={props.params.id} />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
