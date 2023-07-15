"use client";

import { LOCAL_ASSETS, URLS } from "@/constants";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	HStack,
	IconButton,
	LinkBox,
	LinkOverlay,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
import { ImageFill } from "@/components/ui";

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

			<Box>
				<Menu>
					<MenuButton
						as={Button}
						size='sm'
						colorScheme='blue'
						variant='outline'
					>
						<HStack spacing={4}>
							<ImageFill
								src={LOCAL_ASSETS.PROFILE_PIC_DEFAULT}
								alt='profile picture'
								wrapperProps={{
									boxSize: "20px",
									borderRadius: "50%",
								}}
							/>
							<Text>Profile</Text>
						</HStack>
					</MenuButton>
					<MenuList p={2}>
						<MenuItem>
							<LinkBox as={HStack} spacing={3} fontSize='sm'>
								<LockResetIcon fontSize='small' />
								<LinkOverlay fontWeight='medium' href={URLS.RESET_PASSWORD}>
									Change Password
								</LinkOverlay>
							</LinkBox>
						</MenuItem>
						<MenuItem as='button' onClick={handleLogout} fontSize='sm'>
							<LogoutIcon fontSize='small' />
							<Text ml={3} fontWeight='medium'>
								Logout
							</Text>
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
		</HStack>
	);
}
