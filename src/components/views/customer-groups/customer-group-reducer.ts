import { Reducer } from "react";

export type Fields = {
	code: string;
	name: string;
	clientCode: string;
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
		code: "",
		name: "",
		clientCode: "",
	},
	errors: {
		code: "",
		name: "",
		clientCode: "",
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
