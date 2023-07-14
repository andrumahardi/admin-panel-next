import { ENV } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";

export function createClientSideFetch() {
	const token = Cookies.get("token");
	const fetch = axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	return fetch;
}

export function createServerSideFetch(token?: string) {
	const fetch = axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	return fetch;
}
