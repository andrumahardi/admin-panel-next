import { ENV } from "@/constants";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { cache } from "react";

export const createClientSideFetch = cache(() => {
	const token = Cookies.get("token");
	const fetch = axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	return fetch;
});

export const createServerSideFetch = cache((token?: string) => {
	const fetch = axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	return fetch;
});

export function fetchErrorInterceptors(err: AxiosError) {
	if (window.location) {
		const status = 500;
		window.location.assign(`/${status}`);
	}
	return Promise.reject(err);
}
