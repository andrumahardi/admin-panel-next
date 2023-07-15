import { Reducer } from "react";

export type Fields = {
	email: string;
	password: string;
};

type Action = {
	[FieldName in keyof Fields]: {
		name: FieldName;
		value: Fields[FieldName];
	};
}[keyof Fields];

type State = {
	values: Fields;
	errors: { [FieldKey in keyof Fields]: string };
};

export const initialState: State = {
	values: {
		email: "",
		password: "",
	},
	errors: {
		email: "",
		password: "",
	},
};

export const reducer: Reducer<State, Action> = (state, action) => {
	return {
		...state,
		values: {
			...state.values,
			[action.name]: action.value,
		},
	};
};
