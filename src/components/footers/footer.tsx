import { HStack, Text } from "@chakra-ui/react";

export function Footer() {
	return (
		<HStack
			justifyContent='space-between'
			w='full'
			position='absolute'
			bottom={0}
			bgColor='#ffffff'
			p={4}
		>
			<Text>© All rights reserved.</Text>
			<Text>Version 3.0.0-alpha</Text>
		</HStack>
	);
}
