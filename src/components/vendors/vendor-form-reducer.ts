import { Reducer } from "react";

export type Fields = {
	name: string;
	email: string;
	bankCode: string;
	bankName: string;
	accountNumber: string;
	accountName: string;
};

type Action = {
	[FieldName in keyof Fields]: {
		name: FieldName;
		value: Fields[FieldName];
	};
}[keyof Fields];

export type State = {
	values: Fields;
	errors: { [FieldKey in keyof Fields]: string };
};

export const initialState: State = {
	values: {
		name: "",
		email: "",
		bankCode: "",
		bankName: "",
		accountNumber: "",
		accountName: "",
	},
	errors: {
		name: "",
		email: "",
		bankCode: "",
		bankName: "",
		accountNumber: "",
		accountName: "",
	},
};

export const reducer: Reducer<State, Action> = (state, action) => {
	const values = {
		...state.values,
		[action.name]: action.value,
	};

	if (!action.value) {
		return {
			errors: {
				...state.errors,
				[action.name]: `Field ${action.name} is required`,
			},
			values: { ...values },
		};
	}

	return {
		errors: {
			...state.errors,
			[action.name]: "",
		},
		values: { ...values },
	};
};
