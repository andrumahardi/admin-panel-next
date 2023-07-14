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
import { Fields, State, initialState, reducer } from "./bank-account-reducer";
import {
	useCreateBankAccount,
	useGetBankAccountDetail,
	useUpdateBankAccount,
} from "./queries";
import { useRouter } from "next/navigation";

type Props = {
	id?: string;
};

export function BankAccountForm(props: Props) {
	const router = useRouter();

	const { mutate: createFn, isLoading: isCreating } = useCreateBankAccount();
	const { mutate: updateFn, isLoading: isUpdating } = useUpdateBankAccount();
	const { data } = useGetBankAccountDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						holderName: (data?.data || {}).holderName || "",
						bankName: (data?.data || {}).bankName || "",
						accountNumber: (data?.data || {}).accountNumber || "",
						openingBalance: (data?.data || {}).openingBalance || "",
						contactNumber: (data?.data || {}).contactNumber || "",
						bankAddress: (data?.data || {}).bankAddress || "",
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
					holder_name: state.values.holderName,
					bank_name: state.values.bankName,
					account_number: state.values.accountNumber,
					opening_balance: state.values.openingBalance,
					contact_number: state.values.contactNumber,
					bank_address: state.values.bankAddress,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.BANK_ACCOUNTS);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.BANK_ACCOUNTS);
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
					<Text>{props.id ? "Update" : "Create"} Tax</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
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
						<FormControl isInvalid={Boolean(state.errors.holderName)}>
							<FormLabel>Holder Name</FormLabel>
							<Input
								name='holderName'
								value={state.values.holderName}
								onChange={onChange}
								placeholder='Input Holder Name'
							/>
							{state.errors.holderName && (
								<FormErrorMessage>{state.errors.holderName}</FormErrorMessage>
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
						<FormControl isInvalid={Boolean(state.errors.openingBalance)}>
							<FormLabel>Opening Balance</FormLabel>
							<Input
								name='openingBalance'
								value={state.values.openingBalance}
								onChange={onChange}
								placeholder='Input Opening Balance'
								type='number'
							/>
							{state.errors.openingBalance && (
								<FormErrorMessage>
									{state.errors.openingBalance}
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.contactNumber)}>
							<FormLabel>Contact Number</FormLabel>
							<Input
								name='contactNumber'
								value={state.values.contactNumber}
								onChange={onChange}
								placeholder='Input Contact Number'
								type='tel'
							/>
							{state.errors.contactNumber && (
								<FormErrorMessage>
									{state.errors.contactNumber}
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.bankAddress)}>
							<FormLabel>Bank Address</FormLabel>
							<Textarea
								name='bankAddress'
								value={state.values.bankAddress}
								onChange={onChange}
								placeholder='Input Bank Address'
							/>
							{state.errors.bankAddress && (
								<FormErrorMessage>{state.errors.bankAddress}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button as='a' variant='ghost' mr={3} href={URLS.BANK_ACCOUNTS}>
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
