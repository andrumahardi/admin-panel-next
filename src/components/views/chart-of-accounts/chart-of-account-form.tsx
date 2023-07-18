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
import {
	Fields,
	State,
	initialState,
	reducer,
} from "./chart-of-account-reducer";
import {
	useCreateChartOfAccount,
	useGetChartOfAccountDetail,
	useUpdateChartOfAccount,
} from "./queries";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";
import { useGetTypeAccounts } from "../type-accounts/queries";
import { useGetCategoryAccounts } from "../category-accounts/queries";

type Props = {
	id?: string;
};

export function ChartOfAccountForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateChartOfAccount();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateChartOfAccount();
	const { data, error: detailError } = useGetChartOfAccountDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});
	const { data: typeAccounts, error: typeAccountsError } = useGetTypeAccounts({
		page: 1,
		pageSize: 10,
	});
	const { data: categoryAccounts, error: categoryAccountsError } =
		useGetCategoryAccounts({
			page: 1,
			pageSize: 10,
		});
	useErrorHandler({
		error:
			createError ||
			updateError ||
			detailError ||
			typeAccountsError ||
			categoryAccountsError,
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						account: (data?.data || {}).categoryAccount,
						type: (data?.data || {}).typeAccount,
						name: (data?.data || {}).name,
						code: (data?.data || {}).code,
					},
			  }
			: { ...initialState }),
	} as State);

	function onChange(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) {
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
					name: state.values.name,
					code: state.values.code,
					type_account: state.values.type,
					category_account: state.values.account,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.CHART_OF_ACCOUNTS);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.CHART_OF_ACCOUNTS);
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
					<Text>{props.id ? "Update" : "Create"} Chart of Account</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.account)}>
							<FormLabel>Category Account</FormLabel>
							<Select
								name='account'
								placeholder='Select Category Account'
								value={state.values.account}
								onChange={onChange}
							>
								{(categoryAccounts?.data || []).map((el) => (
									<React.Fragment key={el.id}>
										<option value={el.id}>{el.name}</option>
									</React.Fragment>
								))}
							</Select>
							{state.errors.account && (
								<FormErrorMessage>{state.errors.account}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.type)}>
							<FormLabel>Type Account</FormLabel>
							<Select
								name='type'
								placeholder='Select Type Account'
								value={state.values.type}
								onChange={onChange}
							>
								{(typeAccounts?.data || []).map((el) => (
									<React.Fragment key={el.id}>
										<option value={el.id}>{el.name}</option>
									</React.Fragment>
								))}
							</Select>
							{state.errors.type && (
								<FormErrorMessage>{state.errors.type}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input Name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.code)}>
							<FormLabel>Code</FormLabel>
							<Input
								name='code'
								value={state.values.code}
								onChange={onChange}
								placeholder='Input Code'
							/>
							{state.errors.code && (
								<FormErrorMessage>{state.errors.code}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button
									as='a'
									variant='ghost'
									mr={3}
									href={URLS.CHART_OF_ACCOUNTS}
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
