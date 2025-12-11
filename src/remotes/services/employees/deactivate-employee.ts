import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";

export const useDeactivateEmployee = ({
	onSuccess,
	onError,
}: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (id: number) => {
			await api.patch<void>(`/employees/${id}/deactivate`);
		},
	});

	const deactivateEmployee = async (id: number) => {
		await mutation.mutateAsync(id);
	};

	return { deactivateEmployee };
};
