import { Reducer } from "react";

export type Fields = {
	username: string;
	email: string;
	roleType: string;
	password: string;
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
		username: "",
		email: "",
		roleType: "",
		password: "",
	},
	errors: {
		username: "",
		email: "",
		roleType: "",
		password: "",
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
