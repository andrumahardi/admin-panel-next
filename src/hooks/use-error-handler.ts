import { FetchError, FetchFailed } from "@/types";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";

type Props = {
	error: AxiosError<FetchError | FetchFailed> | null;
};

export function useErrorHandler({ error }: Props) {
	const toast = useToast();
	useEffect(() => {
		if (error) {
			const toastOptions: UseToastOptions = {
				description: "Unknown Error",
				status: "error",
				position: "top-right",
				duration: 2e3,
			};
			const errData: FetchFailed | FetchError =
				error.response?.data || ({} as FetchFailed | FetchError);

			if (((errData as FetchFailed).message || []).length) {
				toastOptions.description =
					(errData as FetchFailed).message[0]?.messages[0]?.message || "";
			}
			if (((errData as FetchError).error || {}).message) {
				toastOptions.description = (errData as FetchError).error.message;
			}

			toast(toastOptions);
		}
	}, [error, toast]);
	return null;
}
