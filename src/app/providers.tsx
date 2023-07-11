"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			retry: false,
		},
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={client}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
