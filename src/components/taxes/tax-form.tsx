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
import { Fields, State, initialState, reducer } from "./tax-form-reducer";
import { useCreateTax, useGetTaxDetail, useUpdateTax } from "./queries";
import { useRouter } from "next/navigation";

type Props = {
	id?: string;
};

export function TaxForm(props: Props) {
	const router = useRouter();

	const { mutate: postTax, isLoading: isCreating } = useCreateTax();
	const { mutate: updateTax, isLoading: isUpdating } = useUpdateTax();
	const { data } = useGetTaxDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						rate: (data?.data || {}).rate || 0,
						name: (data?.data || {}).name || "",
					},
			  }
			: { ...initialState }),
	} as State);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
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
					Name: state.values.name,
					Rate: state.values.rate,
				},
			};
			if (props.id) {
				updateTax(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.TAXES);
						},
					}
				);
			} else {
				postTax(payload, {
					onSuccess: () => {
						router.push(URLS.TAXES);
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
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Tax Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input tax name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.rate)}>
							<FormLabel>Tax Rate</FormLabel>
							<Input
								name='rate'
								value={state.values.rate}
								onChange={onChange}
								placeholder='Input tax rate'
								type='number'
								step='.01'
							/>
							{state.errors.rate && (
								<FormErrorMessage>{state.errors.rate}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button as='a' variant='ghost' mr={3} href={URLS.TAXES}>
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
