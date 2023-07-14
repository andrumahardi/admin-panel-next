import { FetchError, FetchFailed } from "@/types";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export function errorHandler(
	error: AxiosError<FetchError | FetchFailed>,
	toast: ReturnType<typeof useToast>
) {
	let errMsg = "";
	if (((error.response?.data as FetchFailed).message || []).length) {
		errMsg =
			(error.response?.data as FetchFailed).message[0]?.messages[0]?.message ||
			"";
	}
	if (((error.response?.data as FetchError).error || {}).message) {
		errMsg = (error.response?.data as FetchError).error.message;
	}

	toast({
		description: errMsg,
		status: "error",
		position: "top-right",
		duration: 2e3,
	});
}
