import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";

export const useActivateEmployee = ({ onSuccess, onError }: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (id: number) => {
			await api.patch<void>(`/employees/${id}/activate`);
		},
	});

	const activateEmployee = async (id: number) => {
		await mutation.mutateAsync(id);
	};

	return { activateEmployee };
};
