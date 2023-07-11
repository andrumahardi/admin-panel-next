import { FetchError } from "@/types";
import { createClientSideFetch } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type LoginVariables = {
	identifier: string;
	password: string;
};

export async function doLogin(variables: LoginVariables) {
	const fetch = createClientSideFetch();
	const res = await fetch.post("/auth/local", { ...variables });

	return {
		data: res.data,
	};
}

type DoLoginResponse = Awaited<ReturnType<typeof doLogin>>;

export function useLogin() {
	return useMutation<DoLoginResponse, AxiosError<FetchError>, LoginVariables>(
		doLogin
	);
}
