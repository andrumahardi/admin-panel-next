"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export function AuthContainer({ children }: { children: React.ReactNode }) {
	return (
		<Flex
			h='100vh'
			justifyContent='center'
			alignItems='center'
			bgColor='#f4f6f9'
		>
			<Box>
				<Text fontSize='35px' textAlign='center' mb='20px'>
					ERP
				</Text>
				{children}
			</Box>
		</Flex>
	);
}
