import { FetchError } from "@/types";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";

type Props = {
	error: AxiosError<FetchError> | null;
};

export function useErrorHandler({ error }: Props) {
	const toast = useToast();
	useEffect(() => {
		if (error) {
			toast({
				description: error.response?.data.error?.message || "Unknown Error",
				status: "error",
				position: "top-right",
				duration: 2e3,
			});
		}
	}, [error, toast]);
	return null;
}
