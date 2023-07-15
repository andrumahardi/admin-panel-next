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
import { Fields, State, initialState, reducer } from "./bank-transfer-reducer";
import {
	useCreateBankTransfer,
	useGetBankTransferDetail,
	useUpdateBankTransfer,
} from "./queries";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";

type Props = {
	id?: string;
};

export function BankTransferForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateBankTransfer();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateBankTransfer();
	const { data, error: detailError } = useGetBankTransferDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});
	useErrorHandler({
		error: createError || updateError || detailError,
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						amount: (data?.data || {}).amount || "",
						date: (data?.data || {}).date || "",
						reference: (data?.data || {}).reference || "",
						description: (data?.data || {}).description || "",
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
					amount: state.values.amount,
					date: state.values.date,
					reference: state.values.reference,
					description: state.values.description,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.BANK_TRANSFERS);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.BANK_TRANSFERS);
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
					<Text>{props.id ? "Update" : "Create"} Bank Transfer</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.amount)}>
							<FormLabel>Transfer Amount</FormLabel>
							<Input
								name='amount'
								value={state.values.amount}
								onChange={onChange}
								placeholder='Input Transfer Amount'
								type='number'
							/>
							{state.errors.amount && (
								<FormErrorMessage>{state.errors.amount}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.date)}>
							<FormLabel>Transfer Date</FormLabel>
							<Input
								name='date'
								value={state.values.date}
								onChange={onChange}
								placeholder='Input Transfer Date'
								type='date'
							/>
							{state.errors.date && (
								<FormErrorMessage>{state.errors.date}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.reference)}>
							<FormLabel>Reference Number</FormLabel>
							<Input
								name='reference'
								value={state.values.reference}
								onChange={onChange}
								placeholder='Input Reference Number'
								type='number'
							/>
							{state.errors.reference && (
								<FormErrorMessage>{state.errors.reference}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.description)}>
							<FormLabel>Description</FormLabel>
							<Textarea
								name='description'
								value={state.values.description}
								onChange={onChange}
								placeholder='Input Description'
							/>
							{state.errors.description && (
								<FormErrorMessage>{state.errors.description}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button
									as='a'
									variant='ghost'
									mr={3}
									href={URLS.BANK_TRANSFERS}
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
