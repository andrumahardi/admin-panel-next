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
		perPage: +(searchParams?.get("perpage") || 10),
	};

	function setPerPage(e: ChangeEvent<HTMLSelectElement>) {
		const params = createQueryString(
			searchParams?.toString() || "",
			"perpage",
			e.target.value
		);
		router.push(`${targetUrl}${params}`);
	}

	return {
		query,
		setPerPage,
	};
}
