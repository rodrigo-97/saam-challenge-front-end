import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs";
import type { SignIn } from "@/models";
import type { RemoteSignIn } from "@/remotes/models";

export const useSignIn = ({ onError, onSuccess }: MutationProps) => {
	const mutation = useMutation({
		onSuccess,
		onError,
		mutationFn: async (signIn: SignIn) => {
			const { data } = await api.post<RemoteSignIn>("/auth/sign-in", signIn);
			return data;
		},
	});

	const signIn = async (signIn: SignIn) => {
		return await mutation.mutateAsync(signIn);
	};

	return {
		signIn,
	};
};
