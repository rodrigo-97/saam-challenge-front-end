import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs";
import type { RemoteEmployee } from "@/remotes/models";

type Props = {
	page: number;
	size: number;
};

export const useFetchEmployees = ({ page, size }: Props) => {
	const query = useQuery({
		queryKey: ["employees", page, size],
		queryFn: async () => {
			const response = await api.get<Pagination<RemoteEmployee>>("/employees", {
				params: {
					page,
					size,
				},
			});
			return response.data;
		},
	});

	return {
		employees: query.data?.data ?? [],
		pagination: query.data?.pagination,
		isLoading: query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
	};
};
