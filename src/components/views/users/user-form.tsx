"use client";

import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useMemo, useReducer } from "react";
import { URLS } from "@/constants";
import { Fields, State, initialState, reducer } from "./user-form-reducer";
import { useCreateUser, useGetUserDetail, useUpdateUser } from "./queries";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";
import { useGetRoles } from "../roles/queries";

type Props = {
	id?: string;
};

const rootUrl = URLS.USERS;

export function UserForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateUser();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateUser();
	const { data, error: detailError } = useGetUserDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});
	const { data: roleTypes, error: roleTypesError } = useGetRoles({
		page: 1,
		pageSize: 10,
	});
	useErrorHandler({
		error: createError || updateError || detailError || roleTypesError,
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						username: (data?.data || {}).username,
						email: (data?.data || {}).email,
					},
			  }
			: { ...initialState }),
	} as State);

	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		dispatch({
			name: e.target.name as keyof Fields,
			value: e.target.value,
		});
	}

	const disableSubmit = useMemo(() => {
		const someFieldsEmpty = Object.values(state.values).some((e) => !e);
		const hasErrorValidation = Object.values(state.errors).some((e) => e);
		return someFieldsEmpty || hasErrorValidation;
	}, [state.values, state.errors]);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!disableSubmit) {
			const payload = {
				username: state.values.username,
				email: state.values.email,
				role: +state.values.roleType,
				password: state.values.password,
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(rootUrl);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(rootUrl);
					},
				});
			}
		}
	}

	return (
		<>
			<Box bgColor='#ffffff' borderRadius='10px'>
				<HStack
					p={4}
					borderBottom='1px solid'
					borderColor='#eaeaea'
					justifyContent='space-between'
				>
					<Text>{props.id ? "Update" : "Create"} Role</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.username)}>
							<FormLabel>User Name</FormLabel>
							<Input
								name='username'
								value={state.values.username}
								onChange={onChange}
								placeholder='Input Username'
							/>
							{state.errors.username && (
								<FormErrorMessage>{state.errors.username}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.email)}>
							<FormLabel>Email</FormLabel>
							<Input
								name='email'
								type='email'
								value={state.values.email}
								onChange={onChange}
								placeholder='Input Email'
							/>
							{state.errors.email && (
								<FormErrorMessage>{state.errors.email}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.password)}>
							<FormLabel>Password</FormLabel>
							<Input
								name='password'
								type='password'
								value={state.values.password}
								onChange={onChange}
								placeholder='Input Password'
							/>
							{state.errors.password && (
								<FormErrorMessage>{state.errors.password}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.roleType)}>
							<FormLabel>Role Type</FormLabel>
							<Select
								name='roleType'
								placeholder='Select Role Type'
								value={state.values.roleType}
								onChange={onChange}
							>
								{(roleTypes?.data || []).map((el) => (
									<React.Fragment key={el.id}>
										<option value={el.id}>{el.name}</option>
									</React.Fragment>
								))}
							</Select>
							{state.errors.roleType && (
								<FormErrorMessage>{state.errors.roleType}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button as='a' variant='ghost' mr={3} href={rootUrl}>
									Cancel
								</Button>
								<Button
									type='submit'
									colorScheme='blue'
									isDisabled={disableSubmit}
									isLoading={isCreating || isUpdating}
								>
									Submit
								</Button>
							</Box>
						</HStack>
					</VStack>
				</form>
			</Box>
		</>
	);
}
