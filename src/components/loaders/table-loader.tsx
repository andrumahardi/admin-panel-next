import { Box, HStack, Skeleton, VStack } from "@chakra-ui/react";
import React from "react";

export function TableLoader() {
	return (
		<Box bgColor='#ffffff' borderRadius='10px'>
			<HStack
				p={4}
				borderBottom='1px solid'
				borderColor='#eaeaea'
				justifyContent='space-between'
			>
				<Box>
					<Skeleton h='20px' w='250px' />
				</Box>
				<Box>
					<Skeleton h='40px' w='150px' />
				</Box>
			</HStack>
			<VStack p={4}>
				{Array.from(Array(10)).map((_, i) => (
					<React.Fragment key={i + 1}>
						<Box w='full'>
							<Skeleton h='30px' w='full' />
						</Box>
					</React.Fragment>
				))}
			</VStack>

			<HStack w='full' justifyContent='space-between'>
				<HStack w='full' justifyContent='space-between'>
					<Box p={4}>
						<Skeleton h='30px' w='200px' />
					</Box>
					<Box p={4}>
						<Skeleton h='30px' w='200px' />
					</Box>
				</HStack>
			</HStack>
		</Box>
	);
}
