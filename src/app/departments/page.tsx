import { Departments, MainContainer } from "@/components";
import { cookies } from "next/headers";
import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "../../components/hydrate-client";
import { getQueryClient } from "@/utils";
import {
	DepartmentsQuery,
	departmentKeys,
	getDepartments,
} from "@/components/departments/queries";

export default async function DepartmentsPage({
	searchParams,
}: {
	searchParams: DepartmentsQuery;
}) {
	const cookie = cookies();
	const token = cookie.get("token")?.value || "";
	const query = {
		page: +(searchParams.page || 1),
		pageSize: +(searchParams.pageSize || 10),
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(departmentKeys.list(query), async () => {
		const fetch = createServerSideFetch(token);
		return await getDepartments(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Departments />
			</MainContainer>
		</ReactQueryHydrate>
	);
}