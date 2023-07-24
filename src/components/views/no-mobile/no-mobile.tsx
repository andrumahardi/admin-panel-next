import { Box, Flex, Text } from "@chakra-ui/react";

export function NoMobile() {
	return (
		<Flex h='100vh' justifyContent='center' alignItems='center'>
			<Box>
				<Text textAlign='center'>
					For full experience please open this site on your
					desktop/pc/laptop&rsquo;s browser
				</Text>
			</Box>
		</Flex>
	);
}
