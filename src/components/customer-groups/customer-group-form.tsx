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
	VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useMemo, useReducer } from "react";
import { URLS } from "@/constants";
import { Fields, State, initialState, reducer } from "./customer-group-reducer";
import {
	useCreateCustomerGroup,
	useGetCustomerGroupDetail,
	useUpdateCustomerGroup,
} from "./queries";
import { useRouter } from "next/navigation";

type Props = {
	id?: string;
};

export function CustomerGroupForm(props: Props) {
	const router = useRouter();

	const { mutate: createFn, isLoading: isCreating } = useCreateCustomerGroup();
	const { mutate: updateFn, isLoading: isUpdating } = useUpdateCustomerGroup();
	const { data } = useGetCustomerGroupDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						code: (data?.data || {}).code || "",
						name: (data?.data || {}).name || "",
						clientCode: (data?.data || {}).clientCode || "",
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
				data: {
					code: state.values.code,
					name: state.values.name,
					client_code: state.values.clientCode,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.CUSTOMER_GROUPS);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.CUSTOMER_GROUPS);
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
					<Text>{props.id ? "Update" : "Create"} Customer Group</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.code)}>
							<FormLabel>Customer Group Code</FormLabel>
							<Input
								name='code'
								value={state.values.code}
								onChange={onChange}
								placeholder='Input Customer Group Code'
							/>
							{state.errors.code && (
								<FormErrorMessage>{state.errors.code}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Customer Group Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input Customer Group Name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.clientCode)}>
							<FormLabel>Client Code</FormLabel>
							<Input
								name='clientCode'
								value={state.values.clientCode}
								onChange={onChange}
								placeholder='Input Client Code'
							/>
							{state.errors.clientCode && (
								<FormErrorMessage>{state.errors.clientCode}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button
									as='a'
									variant='ghost'
									mr={3}
									href={URLS.CUSTOMER_GROUPS}
								>
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
