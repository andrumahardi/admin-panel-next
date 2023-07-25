"use client";

import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useMemo, useReducer } from "react";
import { URLS } from "@/constants";
import { Fields, State, initialState, reducer } from "./role-form-reducer";
import { useCreateRole, useGetRoleDetail, useUpdateRole } from "./queries";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";

type Props = {
	id?: string;
};

const rootUrl = URLS.ROLES;

export function RoleForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateRole();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateRole();
	const { data, error: detailError } = useGetRoleDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});
	useErrorHandler({ error: createError || updateError || detailError });

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						name: (data?.data || {}).name,
						description: (data?.data || {}).description,
					},
			  }
			: { ...initialState }),
	} as State);

	function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
				name: state.values.name,
				description: state.values.description,
				type: "authenticated",
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
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Role Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input role name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.description)}>
							<FormLabel>Description</FormLabel>
							<Textarea
								name='description'
								value={state.values.description}
								onChange={onChange}
								placeholder='Input Bank Address'
							/>
							{state.errors.description && (
								<FormErrorMessage>{state.errors.description}</FormErrorMessage>
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
