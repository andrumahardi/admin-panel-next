"use client";

import { createQueryString } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type UsePaginationProps = {
	targetUrl: string;
};

export function usePagination({ targetUrl }: UsePaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const query = {
		page: +(searchParams?.get("page") || 1),
		pageSize: +(searchParams?.get("pageSize") || 10),
	};

	function setPageSize(e: ChangeEvent<HTMLSelectElement>) {
		const params = createQueryString(
			searchParams?.toString() || "",
			"pageSize",
			e.target.value
		);
		router.push(`${targetUrl}${params}`);
	}

	return {
		query,
		setPageSize,
	};
}
