"use client";

import {
	Box,
	Button,
	Checkbox,
	FormControl,
	HStack,
	Input,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useReducer } from "react";
import { initialState, reducer, Fields } from "./login-reducer";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { URLS } from "@/constants";
import { useLogin } from "./queries";
import { errorHandler } from "@/utils";

export function Login() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();
	const { mutate, isLoading } = useLogin();
	const toast = useToast();

	const canLogin = useMemo(() => {
		let output = true;
		for (const key in state.values) {
			if (!state.values[key as keyof Fields]) {
				output = false;
			}
		}
		return output;
	}, [state.values]);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		dispatch({
			name: e.target.name as keyof Fields,
			value: e.target.value,
		});
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (canLogin) {
			mutate(
				{ identifier: state.values.email, password: state.values.password },
				{
					onSuccess: ({ data }) => {
						Cookies.set("token", data.jwt || "", { expires: 7 });
						router.push(URLS.DASHBOARD);
					},
					onError: (err) => {
						errorHandler(err, toast);
					},
				}
			);
		}
	}

	return (
		<VStack
			as='form'
			onSubmit={onSubmit}
			bgColor='#ffffff'
			w='400px'
			padding='20px'
			borderRadius='5px'
			boxShadow='4px 10px 20px #0000003d'
			spacing={4}
		>
			<Text textAlign='center'>Login</Text>
			<FormControl>
				<Input name='email' onChange={onChange} placeholder='Email' />
			</FormControl>
			<FormControl>
				<Input
					name='password'
					onChange={onChange}
					type='password'
					placeholder='Password'
				/>
			</FormControl>
			<HStack w='full' justifyContent='space-between'>
				<Checkbox fontWeight='semibold'>Remember me</Checkbox>
				<Button
					isLoading={isLoading}
					colorScheme='blue'
					type='submit'
					isDisabled={!canLogin}
				>
					Login
				</Button>
			</HStack>
			<Box w='full' color='#003ccd' fontWeight='medium'>
				<Link href={URLS.RESET_PASSWORD}>Forgot your password?</Link>
			</Box>
		</VStack>
	);
}
