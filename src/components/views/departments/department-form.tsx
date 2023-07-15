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
import {
	Fields,
	State,
	initialState,
	reducer,
} from "./department-form-reducer";
import {
	useCreateDepartment,
	useGetDepartmentDetail,
	useUpdateDepartment,
} from "./queries";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks";

type Props = {
	id?: string;
};

const rootUrl = URLS.DEPARTMENTS;

export function DepartmentForm(props: Props) {
	const router = useRouter();

	const {
		mutate: createFn,
		isLoading: isCreating,
		error: createError,
	} = useCreateDepartment();
	const {
		mutate: updateFn,
		isLoading: isUpdating,
		error: updateError,
	} = useUpdateDepartment();
	const { data, error: detailError } = useGetDepartmentDetail({
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
						name: (data?.data || {}).name || "",
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
				},
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
					<Text>{props.id ? "Update" : "Create"} Department</Text>
				</HStack>
				<form onSubmit={onSubmit}>
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<FormControl isInvalid={Boolean(state.errors.name)}>
							<FormLabel>Department Name</FormLabel>
							<Input
								name='name'
								value={state.values.name}
								onChange={onChange}
								placeholder='Input Department Name'
							/>
							{state.errors.name && (
								<FormErrorMessage>{state.errors.name}</FormErrorMessage>
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
