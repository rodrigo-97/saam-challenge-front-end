import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";
import type { CreateEmployee } from "@/models";

export const useCreateEmployee = ({ onError, onSuccess }: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (employee: CreateEmployee) => {
			await api.post<void>("/employees", employee);
		},
	});

	const createEmployee = async (employee: CreateEmployee) => {
		await mutation.mutateAsync(employee);
	};

	return {
		createEmployee,
	};
};
