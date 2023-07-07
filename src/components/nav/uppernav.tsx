"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";

type Props = {
	onClick: () => void;
};

export function UpperNav({ onClick }: Props) {
	return (
		<HStack
			p={2}
			w='full'
			boxShadow='4px 10px 20px #0000003d'
			bgColor='#ffffff'
		>
			<IconButton aria-label='drawer-icon' variant='ghost' onClick={onClick}>
				<HamburgerIcon boxSize='20px' />
			</IconButton>
		</HStack>
	);
}
