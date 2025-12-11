import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs";
import type { RemoteEmployee } from "@/remotes/models";

type Props = {
	id?: number;
};

export const useFetchEmployee = ({ id }: Props) => {
	const query = useQuery({
		queryKey: ["employee", id],
		enabled: !!id,
		queryFn: async () => {
			const { data } = await api.get<RemoteEmployee>(`/employees/${id}`);
			return data;
		},
	});

	return {
		employee: query.data,
		isLoadingEmployee: query.isLoading,
		isErrorEmployee: query.isError,
		refetchEmployee: query.refetch,
	};
};
