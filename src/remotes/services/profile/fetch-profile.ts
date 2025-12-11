import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs";
import type { RemoteUser } from "@/remotes/models";

export const useFetchProfile = () => {
	const query = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data } = await api.get<RemoteUser>("/profile/me");
			return data;
		},
	});

	return {
		user: query.data,
		isLoadingUser: query.isLoading,
		isErrorUser: query.isError,
		refetchUser: query.refetch,
	};
};
