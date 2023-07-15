import { Reducer } from "react";

export type Fields = {
	email: string;
};

type Action = {
	type: string;
} & {
	[FieldName in keyof Fields]: {
		name: FieldName;
		value: Fields[FieldName];
	};
}[keyof Fields];

type State = {
	values: Fields;
	errors: { [FieldKey in keyof Fields]: string };
};

export const ACTION_TYPES = {
	CHANGE_FIELD: "change_field",
	CHANGE_ERROR: "change_error",
};

export const initialState: State = {
	values: {
		email: "",
	},
	errors: {
		email: "",
	},
};

export const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_FIELD: {
			return {
				...state,
				values: {
					...state.values,
					[action.name]: action.value,
				},
			};
		}
		default:
			return state;
	}
};
