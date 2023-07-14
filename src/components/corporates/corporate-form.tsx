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
import { Fields, State, initialState, reducer } from "./corporate-form-reducer";
import {
	useCreateCorporate,
	useGetCorporateDetail,
	useUpdateCorporate,
} from "./queries";
import { useRouter } from "next/navigation";

type Props = {
	id?: string;
};

export function CorporateForm(props: Props) {
	const router = useRouter();

	const { mutate: createFn, isLoading: isCreating } = useCreateCorporate();
	const { mutate: updateFn, isLoading: isUpdating } = useUpdateCorporate();
	const { data } = useGetCorporateDetail({
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
						email: (data?.data || {}).email || "",
						bankCode: (data?.data || {}).bankCode || "",
						bankName: (data?.data || {}).bankName || "",
						accountNumber: (data?.data || {}).accountNumber || "",
						accountName: (data?.data || {}).accountName || "",
						customerGroup: (data?.data || {}).customerGroup || "",
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
					email: state.values.email,
					bank_code: state.values.bankCode,
					bank_name: state.values.bankName,
					account_number: state.values.accountNumber,
					account_name: state.values.accountName,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.CORPORATES);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.CORPORATES);
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
					<Text>{props.id ? "Update" : "Create"} Corporate</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.code)}>
							<FormLabel>Corporate Code</FormLabel>
							<Input
								name='code'
								value={state.values.code}
								onChange={onChange}
								placeholder='Input Corporate Code'
							/>
							{state.errors.code && (
								<FormErrorMessage>{state.errors.code}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Corporate Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input Corporate Name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.email)}>
							<FormLabel>Email</FormLabel>
							<Input
								name='email'
								value={state.values.email}
								onChange={onChange}
								placeholder='Input Email'
								type='email'
							/>
							{state.errors.email && (
								<FormErrorMessage>{state.errors.email}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.bankCode)}>
							<FormLabel>Bank Code</FormLabel>
							<Input
								name='bankCode'
								value={state.values.bankCode}
								onChange={onChange}
								placeholder='Input Bank Code'
							/>
							{state.errors.bankCode && (
								<FormErrorMessage>{state.errors.bankCode}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.bankName)}>
							<FormLabel>Bank Name</FormLabel>
							<Input
								name='bankName'
								value={state.values.bankName}
								onChange={onChange}
								placeholder='Input Bank Name'
							/>
							{state.errors.bankName && (
								<FormErrorMessage>{state.errors.bankName}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.accountNumber)}>
							<FormLabel>Account Number</FormLabel>
							<Input
								name='accountNumber'
								value={state.values.accountNumber}
								onChange={onChange}
								placeholder='Input Account Number'
								type='number'
							/>
							{state.errors.accountNumber && (
								<FormErrorMessage>
									{state.errors.accountNumber}
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.accountName)}>
							<FormLabel>Account Name</FormLabel>
							<Input
								name='accountName'
								value={state.values.accountName}
								onChange={onChange}
								placeholder='Input Account Name'
							/>
							{state.errors.accountName && (
								<FormErrorMessage>{state.errors.accountName}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button as='a' variant='ghost' mr={3} href={URLS.CORPORATES}>
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
