export type FetchError = {
	data: null;
	error: {
		status: number;
		name: string;
		message: string;
		details: null;
	};
};

export type FetchFailed = {
	message: {
		messages: {
			id: string;
			message: string;
		}[];
	}[];
};
