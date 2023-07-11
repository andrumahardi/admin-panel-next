import { ENV } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";

export function createClientSideFetch() {
	const token = Cookies.get("token");

	return axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});
}

export function createServerSideFetch(token?: string) {
	return axios.create({
		baseURL: ENV.api,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});
}
