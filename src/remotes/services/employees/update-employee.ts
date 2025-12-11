import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";
import type { UpdateEmployee } from "@/models";

export const useUpdateEmployee = ({ onError, onSuccess }: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (employee: UpdateEmployee) => {
			await api.put<void>(`/employees/${employee.id}`, employee);
		},
	});

	const updateEmployee = async (employee: UpdateEmployee) => {
		return mutation.mutateAsync(employee);
	};

	return {
		updateEmployee,
	};
};
