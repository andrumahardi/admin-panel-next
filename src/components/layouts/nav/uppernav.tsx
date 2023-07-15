"use client";

import { LOCAL_ASSETS, URLS } from "@/constants";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	onClick: () => void;
};

export function UpperNav({ onClick }: Props) {
	const router = useRouter();

	function handleLogout() {
		router.push(URLS.LOGIN);
		Cookies.remove("token", { expires: 7 });
	}

	return (
		<HStack
			p={2}
			w='full'
			boxShadow='4px 10px 20px #0000003d'
			bgColor='#ffffff'
			justifyContent='space-between'
		>
			<IconButton aria-label='drawer-icon' variant='ghost' onClick={onClick}>
				<HamburgerIcon boxSize='20px' />
			</IconButton>

			<HStack px={2}>
				<Box>
					<Box w='30px' h='30px' borderRadius='50%' position='relative'>
						<Image
							src={LOCAL_ASSETS.PROFILE_PIC_DEFAULT}
							alt='profile picture default'
							fill
							style={{ objectFit: "cover", objectPosition: "center" }}
						/>
					</Box>
				</Box>
				<Button
					px={4}
					py={2}
					w='full'
					variant='unstyled'
					fontWeight='medium'
					_hover={{ bgColor: "#e9e9e9" }}
					textAlign='left'
					onClick={handleLogout}
				>
					Logout
				</Button>
			</HStack>
		</HStack>
	);
}
