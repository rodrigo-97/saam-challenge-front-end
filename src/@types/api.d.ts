declare global {
	export type ApiErrorResponse = {
		message: string;
	};

	export type ApiError = AxiosError<{ message: string }>;

	export type MutationProps = {
		onSuccess?: () => void;
		onError?: (err: ApiError) => void;
	};

	export type Pagination<T> = {
		data: T[];
		pagination: {
			count: number;
			totalPages: number;
			previousPage: number;
			nextPage: number;
			currentPage: number;
		};
	};

	export type PaginationParams = {
		page: number;
		size: number;
	};
}

export {};
