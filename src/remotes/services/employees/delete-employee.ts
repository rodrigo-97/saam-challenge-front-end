import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";

export const useDeleteEmployee = ({ onError, onSuccess }: MutationProps) => {
	const mutation = useMutation({
		onError,
		onSuccess,
		mutationFn: async (id: number) => {
			await api.delete<void>(`/employees/${id}`);
		},
	});

	const isDeletingEmployee = mutation.isPending;

	const deleteEmployee = async (id: number) => {
		await mutation.mutateAsync(id);
	};

	return {
		deleteEmployee,
		isDeletingEmployee,
	};
};
