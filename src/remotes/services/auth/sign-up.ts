import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";
import type { SignUp } from "@/models";

export const useSignUp = ({ onError, onSuccess }: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (signUp: SignUp) => {
			await api.post<void>("/auth/sign-up", signUp);
		},
	});

	const signUp = async (signUp: SignUp) => {
		await mutation.mutateAsync(signUp);
	};

	return {
		signUp,
	};
};
