declare global {
	export type ApiErrorResponse = {
		message: string;
	};

	export type ApiError = AxiosError<{ message: string }>;

	export type MutationProps = {
		onSuccess?: () => void;
		onError?: (err: ApiError) => void;
	};
}

export {};
