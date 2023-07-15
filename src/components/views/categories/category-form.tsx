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
import { Fields, State, initialState, reducer } from "./category-form-reducer";
import {
	useCreateCategory,
	useGetCategoryDetail,
	useUpdateCategory,
} from "./queries";
import { useRouter } from "next/navigation";
import { useGetCategoryTypes } from "../category-types/queries";
import { useErrorHandler } from "@/hooks";

type Props = {
	id?: string;
};

export function CategoryForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateCategory();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateCategory();
	const { data, error: detailError } = useGetCategoryDetail({
		id: props.id || "",
		options: { enabled: !!props.id },
	});
	const { data: categoryTypes, error: categoryTypesError } =
		useGetCategoryTypes({
			page: 1,
			pageSize: 10,
		});
	useErrorHandler({
		error: createError || updateError || detailError || categoryTypesError,
	});

	const [state, dispatch] = useReducer(reducer, {
		...(props.id
			? {
					...initialState,
					values: {
						...initialState.values,
						name: (data?.data || {}).name || "",
						categoryType: (data?.data || {}).categoryType || "",
					},
			  }
			: { ...initialState }),
	} as State);

	function onChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
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
					category_type: +state.values.categoryType,
				},
			};
			if (props.id) {
				updateFn(
					{ id: props.id, ...payload },
					{
						onSuccess: () => {
							router.push(URLS.CATEGORIES);
						},
					}
				);
			} else {
				createFn(payload, {
					onSuccess: () => {
						router.push(URLS.CATEGORIES);
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
					<Text>{props.id ? "Update" : "Create"} Category</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Category Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input Category Name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={Boolean(state.errors.categoryType)}>
							<FormLabel>Category Type</FormLabel>
							<Select
								name='categoryType'
								placeholder='Select Category Type'
								value={state.values.categoryType}
								onChange={onChange}
							>
								{(categoryTypes?.data || []).map((el) => (
									<React.Fragment key={el.id}>
										<option value={el.id}>{el.name}</option>
									</React.Fragment>
								))}
							</Select>
							{state.errors.categoryType && (
								<FormErrorMessage>{state.errors.categoryType}</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent='flex-end' w='full'>
							<Box>
								<Button as='a' variant='ghost' mr={3} href={URLS.CATEGORIES}>
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
